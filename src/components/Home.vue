<template>
    <Row>
        <Col :xs="12" :sm="8" :md="6">
            <device-list></device-list>
        </Col>
        <Col :xs="12" :sm="16" :md="18">
            <router-view></router-view>
        </Col>
    </Row>
</template>

<script>
import DeviceList from '@/components/DeviceList'

export default {
    name: 'home',
    components: { DeviceList },
    data: function() {	
        return {
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.device-card {
    margin-bottom: 24px;
    cursor: pointer;
}
.bold {
    font-weight: bold;
}
</style>