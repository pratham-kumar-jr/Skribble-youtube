import { gameService } from "./GameService";

class CanvasService {
    private static _instance: CanvasService | null;
    private _canvas: HTMLCanvasElement | null = null;

    private _batchArray: Array<Array<number>> = [];
    private readonly _batchTime = 50;
    private _isRequiredSending = false;

    private constructor() { }

    public setCanvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    public static getInstance(): CanvasService {
        if (!CanvasService._instance) {
            CanvasService._instance = new CanvasService();
        }
        return CanvasService._instance;
    }

    public drawOnCanvas(
        startX: number,
        startY: number,
        currentX: number,
        currentY: number,
    ) {
        console.log("drawing")
        if (!this._canvas) return;

        const context = this._canvas.getContext("2d");
        if (!context) return;

        startX *= this._canvas.width;
        startY *= this._canvas.height;

        currentX *= this._canvas.width;
        currentY *= this._canvas.height;

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(currentX, currentY);
        context.fillStyle = "black";
        context.lineWidth = 3;
        context.stroke();
    }

    public eraseOnCanvas(
        currentX: number,
        currentY: number,
        size = 20) {

        if (!this._canvas) return;

        const context = this._canvas.getContext("2d");
        if (!context) return;

        currentX *= this._canvas.width;
        currentY *= this._canvas.height;

        context.fillStyle = "white";
        context.fillRect(currentX, currentY, size, size);
    }

    public searlizeCanvas(command: Array<number>) {
        this._batchArray.push(command);
        if (!this._isRequiredSending) {
            setTimeout(() => {
                console.log(this._batchArray)
                gameService.drawClient(this._batchArray);
                this._batchArray = [];
                this._isRequiredSending = false;
            }, this._batchTime)
        }
        this._isRequiredSending = true;
    }

}

export const canvasService = CanvasService.getInstance();