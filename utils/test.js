const debounce = (func, _this, wait) => {
    console.log(_this, '=====_this')
    let timeout = '';
    return (v) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(v, _this);
        }, wait);
    }
};
export {
    debounce
}