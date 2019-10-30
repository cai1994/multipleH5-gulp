<template>
    <div class="el-progress" :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      }
    ]" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
        <div class="el-progress__text" v-if="showText && !textInside" :style="textStyle">
            <template v-if="!status">{{percentage}}%</template>
            <template v-else>
                <slot v-if="status === 'text'"></slot>
                <i v-else :class="iconClass"></i>
            </template>
        </div>
        <div class="el-progress-bar" v-if="type === 'line'">
            <div class="el-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
                <div class="el-progress-bar__inner" :style="barStyle">
                    <div class="el-progress-bar__innerText" v-if="showText && textInside">{{percentage}}%</div>
                </div>
            </div>
        </div>
        <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
            <svg viewBox="0 0 100 100">
                <path class="el-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
                <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ElProgress',
    props: {
        type: {
            type: String,
            default: 'line',
            validator: val => ['line', 'circle'].indexOf(val) > -1
        },
        percentage: {
            type: Number,
            default: 0,
            required: true,
            // validator: val => val >= 0 && val <= 100
        },
        status: {
            type: String,
            validator: val => ['text', 'success', 'exception'].indexOf(val) > -1
        },
        strokeWidth: {
            type: Number,
            default: 6
        },
        textInside: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 126
        },
        showText: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        barStyle() {
            const style = {};
            style.width = this.percentage + '%';
            style.backgroundColor = this.color;
            return style;
        },
        textStyle() {
            const style = {};
            // 减去tip的宽度
            const p = (this.percentage - 5.6) > 94.6 ? 94.6 : (this.percentage - 5.6); // 操过100显示100
            style.marginLeft = p + '%';
            style.backgroundColor = this.color;
            style.display = 'inline';
            return style;

        },
        relativeStrokeWidth() {
            return (this.strokeWidth / this.width * 100).toFixed(1);
        },
        trackPath() {
            const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

            return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
        },
        perimeter() {
            const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
            return 2 * Math.PI * radius;
        },
        circlePathStyle() {
            const perimeter = this.perimeter;
            return {
                strokeDasharray: `${perimeter}px,${perimeter}px`,
                strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
                transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
            };
        },
        stroke() {
            let ret;
            if (this.color) {
                ret = this.color;
            } else {
                switch (this.status) {
                    case 'success':
                        ret = '#13ce66';
                        break;
                    case 'exception':
                        ret = '#ff4949';
                        break;
                    default:
                        ret = '#20a0ff';
                }
            }
            return ret;
        },
        iconClass() {
            if (this.type === 'line') {
                return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close';
            } else {
                return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
            }
        },
        progressTextSize() {
            return this.type === 'line' ?
                12 + this.strokeWidth * 0.4 :
                this.width * 0.111111 + 2;
        }
    }
};

</script>
<style lang="less">
.el-progress {
    position: relative;

    div {
        padding: 0;
    }
}

.el-progress-bar {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    margin-right: -55px;
    box-sizing: border-box;
}

.el-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background-color: #f5f7f7;
    overflow: hidden;
    position: relative;
    vertical-align: middle
}

.el-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #ff6b00;
    opacity: 0.8;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;
    transition: width .6s ease;
}

.el-progress__text {
    position: absolute;
    top: -0.85rem;
    padding: 0 0.3rem;
    font-size: inherit;
    color: #fff;
    display: inline-block;
    background-color: #ff6b00;
    min-width: 1.6rem;
    height: 0.8rem;
    text-align: center;
    border-radius: 0.2rem;


    &:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -0.2rem;
        width: 0;
        height: 0;
        border-left: .2rem solid rgba(0, 0, 0, 0);
        border-right: .2rem solid rgba(0, 0, 0, 0);
        border-top: 0.2rem solid rgb(255, 107, 0);

    }
}

</style>
