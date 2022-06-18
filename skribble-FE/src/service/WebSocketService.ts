import { io, Socket } from "socket.io-client";

class WebSocketService {
    private static _instance: WebSocketService | null;
    private socket: Socket | null = null;

    private constructor() { }

    public static getInstance(): WebSocketService {
        if (!WebSocketService._instance) {
            WebSocketService._instance = new WebSocketService();
        }
        return WebSocketService._instance;
    }

    public init(): void {
        this.socket = io("http://localhost:4000", {
            transports: ["websocket"]
        })

        this.socket.on("error", (error) => console.log(error))
    }


    public emitEvent(event: any, message: any) {
        this.socket?.emit(event, message)
    }

    public registerEvent(event: any, handler: (e: any) => void) {
        this.socket?.on(event, handler)
    }

}

export const webSocketService = WebSocketService.getInstance();