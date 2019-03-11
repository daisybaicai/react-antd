export default {
    formateDate(time){
        if(!time) return '';
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        month = month<10? '0' +month: month;
        let date = time.getDate();
        date = date<10? '0'+date: date;
        return year + '-' + month + '-' + date;
    },
    pagination(data,callback) {
        return {
            onChange: function(current) {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            showQuickJumper: true
        }
    }
}