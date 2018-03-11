import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
let player, cursors;

function preload() {
  this.load.spritesheet("knight", "src/assets/knight-sprite-sheet.png", {
    frameWidth: 90,
    frameHeight: 90
  });
}

function create() {
  player = this.physics.add.sprite(100, 450, "knight");
  player.setBounce(0.5);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("knight", { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("knight", { start: 1, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
  }
}
