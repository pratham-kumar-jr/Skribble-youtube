import { Socket } from "socket.io";
import { EventTypeEnum } from "../enums/EventTypeEnum";

const gameCreateHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CREATE_GAME, ({ player }: { player: any }) => {
    // logic
    console.log("Created Game");
  });
};

export default {
  gameCreateHandler,
};
