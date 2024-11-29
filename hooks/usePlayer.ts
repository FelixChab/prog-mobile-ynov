import { Player } from '@/engine/game-objects/player';
import { useState } from 'react';

export function usePlayer({ id, x, y, size }: { id: number, x: number, y: number, size: number }): [
    player: Player,
    playerX: number,
    playerY: number,
] {
    const [playerX, setPlayerX] = useState(x ? x : 0);
    const [playerY, setPlayerY] = useState(y ? y : 0);

    const player: Player = new Player({
        id: id,
        x: playerX,
        y: playerY,
        ax: 0,
        ay: 0,
        vx: 0,
        vy: 0,
        gravity: true,
        setStateX: setPlayerX,
        setStateY: setPlayerY,
        width: size,
        height: size,
        size: size,
        grounded: false
    });

    return [ player, playerX, playerY ];
}
