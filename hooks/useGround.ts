import { GROUND_HEIGHT, GROUND_SIZE_MAX, GROUND_SIZE_MIN, HOLE_SIZE_MAX, HOLE_SIZE_MIN } from '@/constants/game';
import { Wall } from '@/engine/game-objects/wall';
import { useEffect, useState } from 'react';

export function useGround({ playerX, renderingDistance }: { playerX: number, renderingDistance: number }): Wall[] {
    const createWall = (id: number, x: number) => {
        return new Wall({
            id: id,
            x: x,
            y: GROUND_HEIGHT,
            ax: 0,
            ay: 0,
            vx: 0,
            vy: 0,
            gravity: false,
            setStateX: undefined,
            setStateY: undefined,
            width: Math.floor(Math.random() * (GROUND_SIZE_MAX - GROUND_SIZE_MIN)) + GROUND_SIZE_MIN,
            height: 500,
            grounded: false
        });
    }

    const [grounds, setGrounds] = useState<Wall[]>([createWall(0, 0)]);
    const [nbOfWall, setNbOfWall] = useState<number>(1);

    useEffect(() => {
        const lastGround = grounds[grounds.length - 1];
        if (lastGround.x - playerX <= renderingDistance) {
            const holeSize = Math.floor(Math.random() * (HOLE_SIZE_MAX - HOLE_SIZE_MIN)) + HOLE_SIZE_MIN;
            const wall = createWall(nbOfWall, lastGround.getRight() + holeSize);
            grounds.push(wall);
            if (grounds.length > 5) grounds.splice(0, 1);
            setGrounds(grounds);
            setNbOfWall(prev => prev + 1);
        }

    }, [playerX]);

    return grounds;
}
