cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        boomNode: cc.Node,
        enermyNode: cc.Node,
        scoreLabel: cc.Label,
    },

    initEnemy() {
        this.enermyNode.active = true;
        console.log('this.enermyNode', this.enermyNode)
       let x =  cc.winSize.width - this.enermyNode.width/2
       let y =  Math.random()*cc.winSize.height/3;
       let due = Math.random()*5 + 0.6;
        this.enermyNode.x = 0;
        this.enermyNode.y = cc.winSize.height/3-this.enermyNode.height/2;
        let seq = cc.repeatForever(
            cc.sequence(
                cc.moveTo(due, -x, y),
                cc.moveTo(due, x, y)
            )
        )
        this.enermyAction = this.enermyNode.runAction(seq)

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0;
        this.scoreLabel.string = 0
        console.log('onload')
        this.initEnemy()
        this.initPlayer();
        // 这个node就是被节点在当前注册触摸事件touch可以让节点上移动
        this.node.on('touchstart', this.fire, this)
    },

    initPlayer() {
        this.isOver = false
        this.playerNode.y = -cc.winSize.height/3;
        // 在10s内不点击小球下落
        let seq = cc.sequence(
            cc.moveTo(3, cc.v2(this.playerNode.x, -(cc.winSize.height/2))),
            cc.callFunc(() => {
                console.log(this.playerNode.y, 'y这特么咋回事', cc.winSize.height/2)
                if(Math.abs(this.playerNode.position.y) > 500) {console.log('end',this.playerNode.position.y );this.die()}
            })
        );
        this.playerAction = this.playerNode.runAction(seq)

    },

    die() {
        // 已经撞击到底部或者顶部
        console.log('defeat');
        // 隐藏粒子
        this.playerNode.active = false;
        this.boomSign(this.playerNode.position, this.playerNode.color);
        // 延迟重新加载
        setTimeout(()=>cc.director.loadScene('game'), 1000)
    },

    update (dt) {
        // 相交时判定中心点位置
        if(this.playerNode.position.sub(this.enermyNode.position).mag() < (this.playerNode.width/2+this.enermyNode.width/2)){
            console.log(this.enermyNode, 'this.enermyNode.position', this.enermyNode.position)
            // 解除动画
            this.playerNode.stopAction( this.playerAction)
            this.enermyNode.stopAction(this.enermyAction)
            // 撞击效果
            this.boomSign(this.enermyNode.position, this.enermyNode.color);
            // 隐藏被吞并的敌人节点
            this.enermyNode.active = false;
            this.scoreLabel.string = ++this.score;
            // 重新初始化
            this.initEnemy()
            this.initPlayer();
            console.log('撞击到了')
        }
    },

    onDestroy() {
        console.log('destroy')
        this.node.off('touchstart', this.fire, this)
    },

    fire() {
        if(this.isOver) return
        this.isOver = true
        console.log('发射开始')
        let due = 8;
        // callFunc 动画结束回调
        let seq = cc.sequence(
            cc.moveTo(due, cc.v2(0, cc.winSize.height)),
            cc.callFunc(() => {
                // 控制坐标位置判断是否可以销毁
                console.log('为啥调用 fire', this.playerNode.position)
                if(Math.abs(this.playerNode.position.y) > 1100) {console.log('jiangluo123456');this.die();}
            })
        );
        this.playerAction = this.playerNode.runAction(seq)

    },
    boomSign(pos, color) {
        console.log('pos', pos, color)
        // 不可超出屏幕看不见爆炸效果
        if(pos.y > 640) {
            pos.y =  640
        }
        this.boomNode.setPosition(pos);
        let partical = this.boomNode.getComponent(cc.ParticleSystem);
        if(color) {
            partical.startColor = color;
            partical.endColor = color;
        }
        partical.resetSystem();
        console.log('爆炸结束')
    }
});
