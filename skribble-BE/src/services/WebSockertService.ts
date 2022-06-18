import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";
import GameHandler from "../handler/GameHandler";
import { EventTypeEnum } from "../enums/EventTypeEnum";

class WebSockertService {
  private static _instance: WebSockertService | null;
  private io: Server | null = null;
  private constructor() {}

  public static getInstance(): WebSockertService {
    if (!WebSockertService._instance) {
      WebSockertService._instance = new WebSockertService();
    }
    return WebSockertService._instance;
  }

  public init(server: httpServer) {
    this.io = new Server(server, {
      transports: ["websocket"],
      cors: {
        origin: ["http://localhost:3000"],
      },
    });

    this.io.on("connection", (socket) => {
      GameHandler.gameCreateHandler(socket);
    });
  }

  public sendPrivate(socket: Socket, event: EventTypeEnum, message: any) {
    this.io?.to(socket.id).emit(event, message);
  }

  public sendToRoom(roomId: string, event: EventTypeEnum, message: any) {
    this.io?.to(roomId).emit(event, message);
  }
}

export const webSockertService = WebSockertService.getInstance();
