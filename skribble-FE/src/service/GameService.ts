import { canvasService } from "./CanvasService";
import { webSocketService } from "./WebSocketService";

class GameService {
    private static _instance: GameService | null;

    private constructor() { }

    public static getInstance(): GameService {
        if (!GameService._instance) {
            GameService._instance = new GameService();
        }
        return GameService._instance;
    }

    public init() {
        webSocketService.init();
        webSocketService.registerEvent("/game/canvas/draw", this.drawServer)
    }

    public drawServer(commands: any) {

        for (const command of commands) {
            if (command[0] === 0) {
                canvasService.drawOnCanvas(command[1], command[2], command[3], command[4]);
            } else if (command[0] === 1) {
                canvasService.eraseOnCanvas(command[1], command[2])
            }
        }
    }

    public drawClient(commands: Array<Array<number>>) {
        webSocketService.emitEvent("/game/canvas/draw", commands)
    }

}

export const gameService = GameService.getInstance();