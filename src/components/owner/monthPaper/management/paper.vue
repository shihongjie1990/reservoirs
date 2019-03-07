<template>
    <div class="month-paper">
        <div id="out-table" v-if="tableData.length > 0">
            <div class="month-paper-operation">
                <el-button type="primary" size="mini" @click="onExport">导出Excel</el-button>
            </div>
            <table class="paper-table">
                <tr>
                    <td>I.代 码</td>
                    <td>II．指 标 名 称</td>
                    <td>III．计 量 单 位</td>
                    <td>IV．本 月</td>
                    <td>V．本 年 累 计</td>
                    <td>VI．开 工 累 计</td>
                </tr>
                <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(ceil, i) in row" :key="i">{{ceil}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['monthPaper'],
    data() {
        return {
            year: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getFullYear() < 2018
                }
            },
            focus: null,
            tableData: [],
            monthList: [],
            attachmentData: []
        }
    },
    methods: {
        /**
         *  获取月报数据
         */
        getMonthlyReportExcelByProjectId() {
            let thisRequest = this.$http.get('/api/pmr/excel', {
                params: {
                    id: this.monthPaper.projectMonthlyReportId
                }
            }).then(res => {
                // 附件信息
                let projectMonthlyReportImgs = this.monthPaper.projectMonthlyReportImgs
                if (projectMonthlyReportImgs && projectMonthlyReportImgs.length > 0) {
                    projectMonthlyReportImgs.map(item => {
                        let url = item.imgAddr
                        let type = url.substr(url.lastIndexOf('.') + 1)
                        if (type === 'xls' || type === 'xlsx') {
                            item.icon = 'fa-file-excel-o'
                        } else if (type === 'pdf') {
                            item.icon = 'fa-file-pdf-o'
                        } else {
                            item.icon = 'fa-file-archive-o'
                        }
                        item.name = url.substr(url.lastIndexOf('/') + 1)
                        return item
                    })
                    this.attachmentData = projectMonthlyReportImgs
                } else {
                    this.attachmentData = []
                }
                // 月报内容
                this.tableData = res.data
            })
            return thisRequest
        },
        /**
         *  附件下载
         */
        downloadFile(addr) {
            let url = location.origin + '/files/' + addr
            window.open(url, '_self')
        },
        /**
         *  excel导出
         */
        /* eslint-disable */
        onExport() {
            let wb = XLSX.utils.table_to_book(document.getElementById('out-table'))
            let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
            saveAs(
                new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
                'sheetjs.xlsx'
            )
        },
        s2ab(str) {
            if (typeof ArrayBuffer !== 'undefined') {
                let buf = new ArrayBuffer(str.length)
                let view = new Uint8Array(buf)
                for (let i = 0; i !== str.length; i++) {
                view[i] = str.charCodeAt(i) & 0xff
                }
                return buf
            } else {
                let buf = new Array(str.length)
                for (let i = 0; i !== str.length; i++) {
                buf[i] = str.charCodeAt(i) & 0xff
                }
                return buf
            }
        }
        /* eslint-disable */
    },
    mounted() {
        this.getMonthlyReportExcelByProjectId()
    }
}
</script>
