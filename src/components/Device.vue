<template>
    <div>
        <h1 class="device-id">
            <span class="dot warning" v-if="device.status == 'warning'"></span>
            <span class="dot error" v-else-if="device.status == 'error'"></span>
            <span class="dot normal" v-else></span>
            {{ device.id }}
        </h1>
        <div class="segment">
            <div class="title">充电设备信息</div>
            <div class="info">
                <li class="item">
                    <span class="title">电压(V)：</span>
                    <span class="value">{{ device.voltage }}</span>
                </li>
                <li class="item">
                    <span class="title">电流(A)：</span>
                    <span class="value">{{ device.current }}</span>
                </li>
                <li class="item">
                    <span class="title">功率(W)：</span>
                    <span class="value">{{ device.power }}</span>
                </li>
                <li class="item">
                    <span class="title">通讯状态：</span>
                    <span class="value">{{ device.communicationStatus }}</span>
                </li>
                <li class="item">
                    <span class="title">输入输出状态：</span>
                    <span class="value">{{ device.ioStatus }}</span>
                </li>
            </div>
        </div>

        <div class="segment">
            <div class="title">电动汽车及电池管理系统BMS信息</div>
            <div class="info">
                <li class="item">
                    <span class="title">最高电压(V)：</span>
                    <span class="value">{{ device.maxVoltage }}</span>
                </li>
                <li class="item">
                    <span class="title">最低电压(V)：</span>
                    <span class="value">{{ device.minVoltage }}</span>
                </li>
                <li class="item">
                    <span class="title">最高温度(℃)：</span>
                    <span class="value">{{ device.maxTemperature }}</span>
                </li>
                <li class="item">
                    <span class="title">车辆VIN：</span>
                    <span class="value">{{ device.VIN }}</span>
                </li>
                <li class="item">
                    <span class="title">SOC：</span>
                    <span class="value">{{ device.SOC }}</span>
                </li>
                <li class="item">
                    <span class="title">预计完成时间(分)：</span>
                    <span class="value">{{ device.finishTime }}</span>
                </li>
                <li class="item">
                    <span class="title">需求充电电压(V)：</span>
                    <span class="value">{{ device.voltageNeed }}</span>
                </li>
                <li class="item">
                    <span class="title">需求充电电流(A)：</span>
                    <span class="value">{{ device.currentNeed }}</span>
                </li>
            </div>
        </div>

        <div class="segment">
            <div class="title">充电交易信息</div>
            <Table :border="true" :stripe="false" :columns="chargingHistoryCols" :data="device.chargingHistory"></Table>
        </div>
    </div>
</template>

<script>
import api from '@/api'

export default {
    name: 'device',
    data: function() {	
        return {
            device: {},
            chargingHistoryCols: [{
                title: '交易流水号',
                key: 'id'
            }, {
                title: '充电开始时间',
                key: 'startTime'
            }, {
                title: '充电时长(分)',
                key: 'time'
            }, {
                title: '充电电量',
                key: 'amount'
            }, {
                title: '交易金额(￥)',
                key: 'cost'
            }]
        }
    },
    methods: {},
    created() {
        api.get('/mock-3301.json').then(data => {
            this.device = data;
        })
    }
}
</script>

<style scoped>
.segment {
    margin-top: 20px;
}
.segment>.title {
    font-size: 18px;
    padding: 15px 0;
}
.segment>.title::before {
    content: '#';
    margin-right: 10px;
    font-weight: bold;
}
.segment .info .item {
    margin-bottom: 15px;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    font-size: 14px;
    display: inline-block;
    width: 33%;
}
.segment .info .item .title {
    width: 140px;
    display: inline-block;
    text-align: right;
}
.segment .info .item .value {
    color: #2d8cf0;
    font-weight: bold
}
</style>