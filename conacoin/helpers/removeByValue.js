// 방을 떠났을 대 user 리스트에서 삭제
module.exports = function () {
    Array.prototype.removeByValue = function (search) {
        var index = this.indexOf(search);
        if (index !== -1) {
            this.splice(index, 1);
        }
    };
};