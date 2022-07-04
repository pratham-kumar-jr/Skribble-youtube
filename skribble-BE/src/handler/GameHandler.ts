import { Socket } from "socket.io";
import { EventTypeEnum } from "../enums/EventTypeEnum";
import { webSocketService } from "../services/WebSocketService";

const gameCreateHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CREATE_GAME, ({ player }: { player: any }) => {
    // logic
    console.log("Created Game");
  });
};

const drawHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.DRAW, (commands: Array<Array<number>>) => {
    webSocketService.sendToAll(socket, EventTypeEnum.DRAW, commands);
  });
};

export default {
  gameCreateHandler,
  drawHandler,
};
