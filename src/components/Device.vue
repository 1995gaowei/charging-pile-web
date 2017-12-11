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
                    <div class="title">全周期实时状态数据</div>
                    <div class="info" v-if="device.AllPeriodRealTimeData">
                        <li class="item">
                            <span class="title">输入电压(V)：</span>
                            <span class="value">{{ device.AllPeriodRealTimeData.acInputVoltageA+', '+device.AllPeriodRealTimeData.acInputVoltageB+', '+device.AllPeriodRealTimeData.acInputVoltageC }}</span>
                        </li>
                        <li class="item">
                            <span class="title">输入电流(A)：</span>
                            <span class="value">{{ device.AllPeriodRealTimeData.acInputCurrentA+', '+device.AllPeriodRealTimeData.acInputCurrentB+', '+device.AllPeriodRealTimeData.acInputCurrentC }}</span>
                        </li>
                        <li class="item">
                            <span class="title">车辆引导电压(V)：</span>
                            <span class="value">{{ device.AllPeriodRealTimeData.vehicleGuideVoltage }}</span>
                        </li>
                        <li class="item">
                            <span class="title">BMS辅助电源电压：</span>
                            <span class="value">{{ device.AllPeriodRealTimeData.BMSAuxiliaryVoltage }}</span>
                        </li>
                        <li class="item">
                            <span class="title">充电枪插头温度(℃)</span>
                            <span class="value">{{ device.AllPeriodRealTimeData.ChargerProbeTemperature }}</span>
                        </li>
                    </div>
                </div>

                <div class="segment">
                    <div class="title">充电过程充电桩输出数据</div>
                    <div class="info" v-if="device.chargingOutputData">
                        <li class="item">
                            <span class="title">输出电压(V)：</span>
                            <span class="value">{{ device.chargingOutputData.voltage }}</span>
                        </li>
                        <li class="item">
                            <span class="title">输出电流(A)：</span>
                            <span class="value">{{ device.chargingOutputData.current }}</span>
                        </li>
                        <li class="item">
                            <span class="title">AC/DC最高温度(℃)：</span>
                            <span class="value">{{ device.chargingOutputData.moduleMaxTemperature }}</span>
                        </li>
                        <li class="item">
                            <span class="title">充电电量(kWh)：</span>
                            <span class="value">{{ device.chargingOutputData.chargingVolume }}</span>
                        </li>
                        <li class="item">
                            <span class="title">充电时间(分)：</span>
                            <span class="value">{{ device.chargingOutputData.chargingTimeMs }}</span>
                        </li>
                    </div>
                </div>

                <div class="segment">
                    <div class="title">充电过程BMS数据</div>
                    <div class="info" v-if="device.chargingBMSData">
                        <li class="item">
                            <span class="title">电池总电压(V)：</span>
                            <span class="value">{{ device.chargingBMSData.batteryVol }}</span>
                        </li>
                        <li class="item">
                            <span class="title">充电电压(V)：</span>
                            <span class="value">{{ device.chargingBMSData.chargingVol }}</span>
                        </li>
                        <li class="item">
                            <span class="title">充电电流(A)：</span>
                            <span class="value">{{ device.chargingBMSData.chargingCur }}</span>
                        </li>
                        <li class="item">
                            <span class="title">剩余充电时间(分)：</span>
                            <span class="value">{{ device.chargingBMSData.timeToCharge }}</span>
                        </li>
                        <li class="item">
                            <span class="title">车辆Vin：</span>
                            <span class="value">{{ device.chargingBMSData.vehVin }}</span>
                        </li>
                        <li class="item">
                            <span class="title">车辆Soc：</span>
                            <span class="value">{{ device.chargingBMSData.vehSoc }}</span>
                        </li>
                        <li class="item">
                            <span class="title">开始充电Soc：</span>
                            <span class="value">{{ device.chargingBMSData.chargingSoc }}</span>
                        </li>
                        <li class="item">
                            <span class="title">最高允许电压(V)：</span>
                            <span class="value">{{ device.chargingBMSData.chargingMaxVol }}</span>
                        </li>
                        <li class="item">
                            <span class="title">最高允许电流(A)：</span>
                            <span class="value">{{ device.chargingBMSData.chargingMaxCur }}</span>
                        </li>
                    </div>
                </div>
            </TabPane>

            <TabPane label="设备控制" name="control">
                <div class="segment">
                    <div class="title">设备控制</div>
                    <Form v-if="device.control" :model="device.control" :label-width="180">
                        <FormItem label="启动 / 停止设备">
                            <i-switch v-model="device.control.chargingStatus" @on-change="changeStatus"></i-switch>
                        </FormItem>
                        <FormItem label="输出电压(V)">
                            <InputNumber :step="10" v-model="device.control.outputVoltage" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem label="输出电流(A)">
                            <InputNumber :step="10" v-model="device.control.outputCurrent" placeholder="请输入数值"></InputNumber>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="remoteControl">更改设置</Button>
                        </FormItem>
                    </Form>
                </div>
            </TabPane>

            <TabPane label="参数设置" name="setting">
                <div class="segment">
                    <div class="title">设备参数设置</div>
                    <Form v-if="device.parameters" :model="device.parameters" :label-width="180">
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

            <TabPane label="数据记录" name="dataRecord">
                <div class="segment">
                    <div class="title">充电交易信息</div>
                    <!-- <Table :border="true" :stripe="false" :columns="chargingHistoryCols" :data="device.chargingHistory"></Table> -->
                    <div class="ivu-table-wrapper">
                        <table cellspacing="0" cellpadding="0" border="0" class="ivu-table ivu-table-border history-table" style="width: 100%;">
                            <thead>
                                <th class="ivu-table-cell">启动控制码</th>
                                <th class="ivu-table-cell">车辆Vin</th>
                                <th class="ivu-table-cell">充电开始时间</th>
                                <th class="ivu-table-cell">充电时长(分钟)</th>
                                <th class="ivu-table-cell">充电电能(W)</th>
                                <th class="ivu-table-cell">交易金额(￥)</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in device.chargingHistory" :key="item.id">
                                    <td class="ivu-table-cell">{{ item.controlCode }}</td>
                                    <td class="ivu-table-cell">{{ item.VIN }}</td>
                                    <td class="ivu-table-cell">{{ item.startTime }}</td>
                                    <td class="ivu-table-cell">{{ item.time }}</td>
                                    <td class="ivu-table-cell">{{ item.volume }}</td>
                                    <td class="ivu-table-cell">{{ item.cost }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="segment">
                    <div class="title">故障告警记录</div>
                    <div class="ivu-table-wrapper">
                        <table cellspacing="0" cellpadding="0" border="0" class="ivu-table ivu-table-border history-table" style="width: 100%;">
                            <thead>
                                <th class="ivu-table-cell">故障告警类型</th>
                                <th class="ivu-table-cell">发生时间</th>
                                <th class="ivu-table-cell">恢复时间</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in device.alarms" :key="item.id">
                                    <td class="ivu-table-cell">{{ FaultAlarmEnum[item.type] }}</td>
                                    <td class="ivu-table-cell">{{ item.startTime }}</td>
                                    <td class="ivu-table-cell">{{ item.endTime }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import api from '@/api'
import { FaultAlarmEnum } from '@/enums'

export default {
    name: 'device',
    data: function() {	
        return {
            device: {},
            FaultAlarmEnum
        }
    },
    methods: {
        modifySetting() {

        },
        changeStatus(status) {

        },
        remoteControl() {

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