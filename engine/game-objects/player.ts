import { ACCELERATION, DECELERATION, JUMP_FORCE } from "@/constants/game";
import { GameObject } from "./game_object";

export class Player extends GameObject {
    size: number = 0;

    constructor({ id, x, y, ax, ay, vx, vy, gravity, setStateX, setStateY, width, height, size, grounded }: {
        id: number,
        x: number,
        y: number,
        ax: number,
        ay: number,
        vx: number,
        vy: number,
        gravity: boolean,
        setStateX: React.Dispatch<React.SetStateAction<number>>,
        setStateY: React.Dispatch<React.SetStateAction<number>>,
        width: number,
        height: number,
        size: number,
        grounded: boolean
    }) {
        super({ id, x, y, ax, ay, vx, vy, gravity, setStateX, setStateY, width, height, grounded });
        this.size = size;
    }

    jump() {
        this.grounded = false;
        this.vy = JUMP_FORCE;
    }

    accelerate() {
        this.ax = ACCELERATION;
    }

    decelerate() {
        this.ax = DECELERATION;
        if (this.vx <= 0) {
            this.ax = 0;
            this.vx = 0;
        }
    }
}
