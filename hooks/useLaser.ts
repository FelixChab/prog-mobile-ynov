import { LASER_ACCELERATION, LASER_WEIGHT } from '@/constants/game';
import { Laser } from '@/engine/game-objects/laser';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';

export function useLaser({ id, x }: { id: number, x: number }): [
    laser: Laser,
    laserX: number
] {
    const { width, height } = useWindowDimensions();
    const [laserX, setLaserX] = useState(x);

    const laser: Laser = new Laser({
        id: id,
        x: laserX,
        y: 0,
        ax: LASER_ACCELERATION,
        ay: 0,
        vx: 0,
        vy: 0,
        gravity: false,
        setStateX: setLaserX,
        setStateY: undefined,
        width: LASER_WEIGHT,
        height: height,
        grounded: false,
        collision: false
    });

    return [ laser, laserX ];
}
