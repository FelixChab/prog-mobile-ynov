import { GRAVITY_STRENGHT, GROUND_HEIGHT, SOUND_LEVEL_CAP_TO_JUMP, SOUND_LEVEL_CAP_TO_WALK } from "@/constants/game";
import { GameObject } from "./game-objects/game_object";
import { Player } from "./game-objects/player";

export const frame_update = (objects: GameObject[], amplitude: number) => {
    objects.forEach((obj) => {
        if (obj.gravity) {
            obj.ay = GRAVITY_STRENGHT;
        }
        
        if (obj instanceof Player) {
            const player: Player = obj;
            
            if (amplitude > SOUND_LEVEL_CAP_TO_JUMP && obj.grounded) {
                player.jump();
            }

            if (amplitude > SOUND_LEVEL_CAP_TO_WALK) {
                player.accelerate();
            } else {
                player.decelerate();
            }
            
            obj = player;
        }

        obj.move(objects);

        if (obj.setStateX) {
            obj.setStateX(obj.x);
        }

        if (obj.setStateY) {
            obj.setStateY(obj.y);
        }
    });
}
