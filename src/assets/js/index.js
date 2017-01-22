const Share = {
    clickShareBtn: function () {
        const size = 'width=626 height=436';
        const url = location.href;
        $('.icon-facebook').on('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}, _blank, ${size}`);
        });
        $('.icon-twitter').on('click', () => {
            window.open(`https://twitter.com/share?url=${url}, _blank, ${size}`);
        });
    }
};
