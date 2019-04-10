window.onload = () => {
    let G = new Game();
    G.start();
}

class Game {
    constructor() {
        this.data = this.prepare();
        this.keydown = false;
        document.addEventListener("keydown", (event) => {
            let e = event || window.event;
            let snake = this.data.snake;

            if (!this.keydown) {
                if (e.keyCode == 37 && snake.mvO != "x") {
                    this.keydown = true;
                    snake.mvO = "x";
                    snake.mvS = -1;

                } else if (e.keyCode == 38 && snake.mvO != "y") {
                    this.keydown = true;
                    snake.mvO = "y";
                    snake.mvS = -1;
                } else if (e.keyCode == 39 && snake.mvO != "x") {
                    this.keydown = true;
                    snake.mvO = "x";
                    snake.mvS = 1;
                } else if (e.keyCode == 40 && snake.mvO != "y") {
                    this.keydown = true;
                    snake.mvO = "y";
                    snake.mvS = 1;
                }
            }

        });
    }

    start() {
        this.tm = setInterval(() => {
            this.keydown = false;
            this.update();
            this.checkCollision();
            this.redraw();
        }, 100);
    }

    update() {
        let snake = this.data.snake;
        snake.seg.reverse().forEach((cseg, i, arr) => {
            if (snake.mvO === "x") {
                if (i == arr.length - 1) {
                    cseg.x += snake.mvS;
                } else {
                    cseg.x = snake.seg[i + 1].x;
                    cseg.y = snake.seg[i + 1].y;
                }
            } else {
                if (i == arr.length - 1) {
                    cseg.y += snake.mvS;
                } else {
                    cseg.x = snake.seg[i + 1].x;
                    cseg.y = snake.seg[i + 1].y;
                }
            }

            if (cseg.x > this.data.cvs.width / 50 - 1) {
                cseg.x = 0;
            }
            if (cseg.x < 0) {
                cseg.x = this.data.cvs.width / 50 - 1;
            }

            if (cseg.y > this.data.cvs.height / 50 - 1) {
                cseg.y = 0;
            }
            if (cseg.y < 0) {
                cseg.y = this.data.cvs.height / 50 - 1;
            }

        });

        snake.seg.reverse();
    }

    checkCollision() {

    }

    redraw() {
        let ctx = this.data.ctx;
        let img = this.data.img;
        let fruit = this.data.fruit;
        let snake = this.data.snake;

        ctx.drawImage(img.bg, 0, 0);
        ctx.drawImage(img.fr, fruit.t * 50, 0, 50, 50, fruit.x * 50, fruit.y * 50, 50, 50);
        snake.seg.forEach((cseg, i) => {
            ctx.fillStyle = "#f22";
            ctx.fillRect(cseg.x * 50, cseg.y * 50, 50, 50);
        });
    }


    prepare() {
        let _cvs = document.getElementById("c1");
        let _ctx = _cvs.getContext("2d");

        let bgImage = new Image();
        bgImage.src = "img/background.png";
        bgImage.addEventListener("load", () => {
            bgImage = this;
        });

        let snImage = new Image();
        snImage.src = "img/snake_red.png";
        snImage.addEventListener("load", () => {
            snImage = this;
        });

        let frImage = new Image();
        frImage.src = "img/fruits.png";
        frImage.addEventListener("load", () => {
            frImage = this;
        });

        let _snake = new Snake(4, 5);
        let _fruit = new Fruit(_cvs.width / 50 - 1, _cvs.height / 50 - 1);

        let data = {
            cvs: _cvs,
            ctx: _ctx,
            img: {
                bg: bgImage,
                sn: snImage,
                fr: frImage
            },
            snake: _snake,
            fruit: _fruit
        }


        return data;
    }
}


class Snake {
    constructor(x, y) {
        this.seg = [];
        for (let i = 0; i < 4; i++) {
            this.seg[i] = { x: x - i, y: y };
        };

        this.mvO = "x";
        this.mvS = 1;
    }
}

class Fruit {
    constructor(mx, my) {
        this.x = Math.floor(Math.random() * mx);
        this.y = Math.floor(Math.random() * my);
        this.t = Math.floor(Math.random() * 3);
    }

}