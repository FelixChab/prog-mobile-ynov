import { GROUND_HEIGHT, MAX_SPEED } from "@/constants/game";

export abstract class GameObject {
    id?: number;
    x: number = 0;
    y: number = 0;
    ax: number = 0;
    ay: number = 0;
    vx: number = 0;
    vy: number = 0;
    gravity: boolean = false;
    setStateX?: React.Dispatch<React.SetStateAction<number>>;
    setStateY?: React.Dispatch<React.SetStateAction<number>>;
    height: number = 0;
    width: number = 0;
    grounded: boolean = false;

    constructor({ id, x, y, ax, ay, vx, vy, gravity, setStateX, setStateY, width, height }: {
        id: number,
        x: number,
        y: number,
        ax: number,
        ay: number,
        vx: number,
        vy: number,
        gravity: boolean,
        setStateX: React.Dispatch<React.SetStateAction<number>> | undefined,
        setStateY: React.Dispatch<React.SetStateAction<number>> | undefined,
        width: number,
        height: number,
        grounded: boolean // useful only if gravity
    }) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.ax = ax;
        this.ay = ay;
        this.vx = vx;
        this.vy = vy;
        this.gravity = gravity;
        this.setStateX = setStateX;
        this.setStateY = setStateY;
        this.width = width;
        this.height = height;
        this.grounded = false;
    }

    getTop() {
        return this.y;
    }

    getBottom() {
        return this.y + this.height;
    }

    getLeft() {
        return this.x;
    }

    getRight() {
        return this.x + this.width;
    }

    checkCollision(obj: GameObject) {
        const [ left, right, top, bottom ] = [ this.getLeft(), this.getRight(), this.getTop(), this.getBottom() ];
        const [ objLeft, objRight, objTop, objBottom ] = [ obj.getLeft(), obj.getRight(), obj.getTop(), obj.getBottom() ];
        
        return (left > objLeft && left < objRight || right > objLeft && right < objRight)
            && (top > objTop && top < objBottom || bottom > objTop && bottom < objBottom);
    }

    move(objects: GameObject[]) {
        this.vx += this.ax;
        this.vy += this.ay;
        
        if (this.vx > MAX_SPEED) this.vx = MAX_SPEED;
        if (this.vx < -MAX_SPEED) this.vx = -MAX_SPEED;
        if (this.vy > MAX_SPEED) this.vy = MAX_SPEED;
        if (this.vy < -MAX_SPEED) this.vy = -MAX_SPEED;
        
        this.x += this.vx;
        const collisionX = objects.filter((obj) => ((obj.constructor != this.constructor || obj.id != this.id) && this.checkCollision(obj)));
        if (collisionX.length) {
            if (this.vx > 0) {
                const collidedObj = collisionX.reduce((prev, cur) => prev.x < cur.x ? prev : cur);
                const delta =  this.getRight() - collidedObj.getLeft();
                this.x -= delta;
            } else {
                const collidedObj = collisionX.reduce((prev, cur) => prev.x > cur.x ? prev : cur);
                const delta = collidedObj.getRight() - this.getLeft();
                this.x += delta;
            }
            this.ax = 0;
            this.vx = 0;
        }
        
        if (this.gravity) this.grounded = false;
        this.y += this.vy;
        const collisionY = objects.filter((obj) => ((obj.constructor != this.constructor || obj.id != this.id) && this.checkCollision(obj)));
        if (collisionY.length) {
            if (this.vy > 0) {
                const collidedObj = collisionY.reduce((prev, cur) => prev.y < cur.y ? prev : cur);
                const delta =  collidedObj.getTop() - this.getBottom();
                this.y += delta;

                if (this.gravity) this.grounded = true;
            } else {
                const collidedObj = collisionY.reduce((prev, cur) => prev.y > cur.y ? prev : cur);
                const delta = collidedObj.getBottom() - this.getTop();
                this.y -= delta;
            }
            this.ay = 0;
            this.vy = 0;
        }
    }
}
