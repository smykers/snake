window.onload = () => {
    let G = new Game();
}

class Game {
    constructor() {
        this.data = this.prepare();
    }

    start(){
        this.tm = setInterval(() => {
            this.update();
            this.checkCollision();
            this.redraw();
        }, 100);
    }

    update(){

    }

    checkCollision(){

    }

    redraw(){
        
    }


    prepare() {
        let _cvs = document.getElementById("c1");
        let _ctx = _cvs.getContext("2d");

        let bgImage = new Image();
        bgImage.src = "img/background.png";
        bgImage.addEventListener("load" , () => {
            bgImage = this;
        });

        let snImage = new Image();
        snImage.src = "img/snake_red.png";
        snImage.addEventListener("load" , () => {
            snImage = this;
        });

        let frImage = new Image();
        frImage.src = "img/fruits.png";
        frImage.addEventListener("load" , () => {
            frImage = this;
        });

        let _snake = new Snake(4,5);
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


class Snake{
    constructor(x, y){
        this.seg = [];
        for(let i=0; i<4; i++){
            this.seg[i] = {x: x-i, y: y};
        };
    }
}

class Fruit{
    constructor(mx, my){
        this.x = Math.floor(Math.random() * mx);
        this.y = Math.floor(Math.random() * my);
        this.t = Math.floor(Math.random() * 3);
    }

}