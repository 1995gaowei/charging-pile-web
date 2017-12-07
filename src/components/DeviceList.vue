<template>
    <Menu  class="device-list" @on-select="selectDevice" width="100%">
        <div class="menu-title">设备列表</div>
        <Submenu :name="group.groupName" v-for="group in groups" :key="group.groupName">
            <template slot="title">{{ group.groupName }}</template>
            <Menu-item :name="device.id" v-for="device in group.devices" :key="device.id">
                <span class="dot warning" v-if="device.status == 'warning'"></span>
                <span class="dot error" v-else-if="device.status == 'error'"></span>
                <span class="dot normal" v-else></span>
                {{ device.id }}
            </Menu-item>
        </Submenu>
    </Menu>
</template>

<script>
import api from '@/api'

export default {
    name: 'device-list',
    data: function() {	
        return {
            groups: []
        }
    },
    methods: {
        selectDevice(deviceId) {
            this.$router.push({ name: 'device', params: { deviceId } } );
        }
    },
    created() {
        api.get('/mock-devices.json').then(data => {
            this.groups = data;
        })
    }
}
</script>

<style scoped>
.menu-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #dddee1;
}
</style>