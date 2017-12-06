<template>
    <Menu  class="device-list" width="260px">
        <Submenu :name="group.groupName" v-for="group in groups" :key="group.groupName">
            <template slot="title">{{ group.groupName }}</template>
            <Menu-item :name="device.id" v-for="device in group.devices" :key="device.id" @click="selectDevice(device)">{{ device.id }}</Menu-item>
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
        selectDevice(device) {
            console.log(device);
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

</style>