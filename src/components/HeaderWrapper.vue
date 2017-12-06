<template>
    <Menu mode="horizontal" active-name="User" class="header" @on-select="selectNav">
        <div class="logo"><Icon type="crop"></Icon> 充电桩监控系统</div>
        <Submenu name="User" style="float: right;">
            <template slot="title">
                <Icon type="person"></Icon>
                用户111
            </template>
            <MenuItem name="setting"><Icon type="gear-a"></Icon> 用户设置</MenuItem>
            <MenuItem name="logout"><Icon type="log-out"></Icon> 切换账号</MenuItem>
        </Submenu>
    </Menu>
</template>

<script>
export default {
    name: 'header-wrapper',
    data() {
        return {
        };
    },
    methods: {
        selectNav(name) {
            console.log(name)
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0 10%;
    z-index: 1000;
}

.logo {
    float: left;
    font-size: 22px;
}
</style>