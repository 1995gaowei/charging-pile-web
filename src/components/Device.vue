<template>
    <div>
        <h1 class="device-id">
            <span class="dot warning" v-if="device.status == 'warning'"></span>
            <span class="dot error" v-else-if="device.status == 'error'"></span>
            <span class="dot normal" v-else></span>
            {{ device.id }}
        </h1>

        <Tabs>
            <TabPane label="实时数据" name="instantData">
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
                            <span class="title">输入状态：</span>
                            <span class="value">{{ device.inputStatus }}</span>
                        </li>
                        <li class="item">
                            <span class="title">输出状态：</span>
                            <span class="value">{{ device.outputStatus }}</span>
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
            </TabPane>

            <TabPane label="参数设置" name="setting">
                <div class="segment">
                    <div class="title">设备参数设置</div>
                    <Form v-if="device.parameters" :model="device" :label-width="180">
                        <FormItem label="最大输出功率(W)">
                            <InputNumber :step="10" v-model="device.parameters.outputPower" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="最大输出电压(V)">
                            <InputNumber :step="10" v-model="device.parameters.outputVoltage" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="最大输出电流(A)">
                            <InputNumber :step="10" v-model="device.parameters.outputCurrent" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="尖电价(￥/ kWh)">
                            <InputNumber :step="0.1" v-model="device.parameters.jianDianJia" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="峰电价(￥/ kWh)">
                            <InputNumber :step="0.1" v-model="device.parameters.fengDianJia" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="平电价(￥/ kWh)">
                            <InputNumber :step="0.1" v-model="device.parameters.pingDianJia" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="谷电价(￥/ kWh)">
                            <InputNumber :step="0.1" v-model="device.parameters.guDianJia" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="上报时间间隔(毫秒)">
                            <InputNumber :step="100" v-model="device.parameters.reportPeroid" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="modifySetting">更改设置</Button>
                        </FormItem>
                    </Form>
                </div>
            </TabPane>

            <TabPane label="交易信息" name="dealInfo">
                <div class="segment">
                    <div class="title">充电交易信息</div>
                    <Table :border="true" :stripe="false" :columns="chargingHistoryCols" :data="device.chargingHistory"></Table>
                </div>
            </TabPane>
        </Tabs>
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
                title: '充电电量(kWh)',
                key: 'amount'
            }, {
                title: '交易金额(￥)',
                key: 'cost'
            }]
        }
    },
    methods: {
        modifySetting() {

        }
    },
    created() {
        api.get('/mock-3301.json').then(data => {
            this.device = data;
        })
    }
}
</script>

<style scoped>
.device-id {
    margin-top: 10px;
    margin-bottom: 15px
}
.device-id .dot {
    width: 18px;
    height: 18px;
}
.ivu-tabs .ivu-tabs-tabpane {
    padding: 10px;
}
.segment {
    margin-bottom: 30px;
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
    width: 49%;
}
.segment .info .item .title {
    width: 160px;
    display: inline-block;
    text-align: right;
}
.segment .info .item .value {
    color: #2d8cf0;
    font-weight: bold
}
.ivu-input-number{
    width: 90%;
}
</style>