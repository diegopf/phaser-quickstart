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
let player, cursors, keyX, platforms;

function preload() {
  this.load.spritesheet("knight", "src/assets/knight-sprite-sheet.png", {
    frameWidth: 90,
    frameHeight: 90
  });
  this.load.image("ground", "src/assets/platform.png");
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, "ground")
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, "ground");

  player = this.physics.add.sprite(100, 450, "knight");
  player.setBounce(0.1);
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

  this.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNumbers("knight", { start: 6, end: 16 }),
    frameRate: 10,
    repeat: 0
  });

  cursors = this.input.keyboard.createCursorKeys();
  keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

  this.physics.add.collider(player, platforms);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else if (keyX.isDown) {
    player.anims.play("attack", true);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-300);
  }
}
