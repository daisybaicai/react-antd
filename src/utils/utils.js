export default {
    formateDate(time){
        if(!time) return '';
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        month = month<10? '0' +month: month;
        let date = time.getDate();
        date = date<10? '0'+date: date;
        return year + '-' + month + '-' + date;
    }
}