/**
 * Created by GuanYong on 16/9/1.
 */

var GustScroll = new function () {
    /**
     * 启用自定义滚动条
     * @param el {Object} 需要启用的元素(jQuery元素)
     */
    this.enable = function (el) {
        if (el.length > 1) {
            for (var i = 0; i < el.length; i++) {
                this.enable($(el[i]));
            }
            return;
        }

        el.addClass("__custom-container");
        el.css("overflow", "hidden");
        if (el.css('position') == 'static' || el.css('position') == '') {
            el.css("position", "relative");
        }
        var html = '<div class="__custom-panel">' + el.html() + '</div>' +
            '<div class="__custom-scroll">' +
            '<div class="__bar"></div>' +
            '</div>';
        el.empty();
        el.html(html);

        this.update(el);
    };

    /**
     * 取消自定义滚动条
     * @param el {Object} 需要取消的元素(jQuery元素)
     */
    this.disable = function (el) {
        if (el.length > 1) {
            for (var i = 0; i < el.length; i++) {
                this.destroyScroll($(el[i]));
            }
            return;
        }

        el.removeClass('__custom-container');
        el.children('.__custom-scroll').find(".__bar").unbind("mousedown");
        el.unbind("mousewheel");
        el.children('.__custom-scroll').remove();
        el.html(el.children('.__custom-panel').html());
        el.children('.__custom-panel').empty();
    };

    /**
     * 更新自定义滚动条
     * @param el {Object} 需要更新的元素(jQuery元素)
     */
    this.update = function (el) {
        if (el.length > 1) {
            for (var i = 0; i < el.length; i++) {
                this.update($(el[i]));
            }
            return;
        }

        var scroll = el.children(".__custom-scroll");
        var panel = el.children(".__custom-panel");

        //获取可视区高度
        var viewHeight = el.height();
        //获取内容高度
        var bodyHeight = panel.height();
        //得到滚动条高度
        var scrollHeight = viewHeight / bodyHeight  * viewHeight;
        var scrollBar = scroll.find(".__bar");
        if(viewHeight / bodyHeight < 1){
            scrollBar.css({height: viewHeight / bodyHeight  * viewHeight, display: "block"});
        }else{
            scrollBar.css({height: 0, display: "none"});
        }

        if (bodyHeight + parseInt(panel.css('top')) < viewHeight) {
            panel.css('top', viewHeight - bodyHeight);
            scrollBar.css({top: - ((viewHeight - bodyHeight) / bodyHeight * viewHeight)});
        }

        var isScroll = false;
        scroll.find(".__bar").unbind("mousedown").mousedown(function(ev){
            isScroll = true;
            var scrollEl = $(this);
            var body = $(this).parents("body").first();
            var mask = $("<div style='position: absolute;width: 100%;height: 100%;z-index: 999999;left: 0px; top: 0px;cursor: default;'></div>").appendTo(body);
            var triggerPoint = {y: ev.pageY - parseInt(scrollEl.css("top"))};
            scrollEl.addClass("moved");
            var panel = scrollEl.parent().siblings(".__custom-panel");
            mask.unbind("mousemove").bind("mousemove", function(maskEv){
                var nextPoint = {y: maskEv.pageY - triggerPoint.y};
                if(nextPoint.y >= 0 && nextPoint.y <= viewHeight - scrollHeight){
                    scrollEl.css({"top": nextPoint.y});
                    panel.css({top: - (nextPoint.y / viewHeight * bodyHeight)});
                }else if(nextPoint.y < 0){
                    scrollEl.css({"top": 0});
                    panel.css({top: 0});
                }else if(nextPoint.y > viewHeight - scrollHeight){
                    scrollEl.css({"top": viewHeight - scrollHeight});
                    panel.css({top: - ((viewHeight - scrollHeight) / viewHeight * bodyHeight)});
                }
            });
            mask.unbind("mouseup").bind("mouseup", function(){
                isScroll = false;
                mask.unbind("mousemove").unbind("mouseup");
                mask.remove();
                scrollEl.removeClass("moved");
            });
            return false;
        });

        el.unbind("mousewheel").mousewheel(function(e){
            var nextTop = e.deltaY * 8;
            var scrollEl = scroll.find(".__bar");
            nextTop = parseInt(scrollEl.css("top")) - nextTop;

            if(nextTop >= 0 && nextTop <= viewHeight - scrollHeight){
                scrollEl.css({"top": nextTop});
                panel.css({top: - (nextTop / viewHeight * bodyHeight)});
            }else if(nextTop < 0){
                scrollEl.css({"top": 0});
                panel.css({top: 0});
            }else if(nextTop > viewHeight - scrollHeight){
                scrollEl.css({"top": viewHeight - scrollHeight});
                panel.css({top: - ((viewHeight - scrollHeight) / viewHeight * bodyHeight)});
            }
        });
    };

    /**
     * 滚动滚动条到指定位置
     * @param el {Object} 需要更新的元素(jQuery元素)
     * @param value {Number} 需要滚动到的位置
     * @param animate {Boolean} 是否启用动画
     */
    this.scrollTo = function (el, value, animate) {
        var panel = el.children('.__custom-panel');
        var scroll = el.children('.__custom-scroll');
        var bar = scroll.children('.__bar');
        if (animate) {
            panel.animate({'top': value}, 300);
            bar.animate({'top': - (value / panel.height() * el.height())}, 300);
        }
        else {
            panel.css('top', value);
            bar.css('top', - (value / panel.height() * el.height()));
        }

    };

    /**
     * 滚动滚动条到顶部
     * @param el {Object} 需要更新的元素(jQuery元素)
     * @param animate {Boolean} 是否启用动画
     */
    this.scrollToTop = function (el, animate) {
        this.scrollTo(el, 0, animate);
    };

    /**
     * 滚动滚动条到底部
     * @param el {Object} 需要更新的元素(jQuery元素)
     * @param animate {Boolean} 是否启用动画
     */
    this.scrollToBottom = function (el, animate) {
        var panel = el.children('.__custom-panel');
        var scroll = el.children('.__custom-scroll');
        this.scrollTo(el, el.height() - panel.height(), animate);
    }
};
