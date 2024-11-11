// ==UserScript==
// @name         BTN HR links
// @namespace    https://github.com/Suwmlee/tracker-scripts
// @version      0.1
// @description  download BTN HR torrents link
// @author       suwmlee
// @match        https://broadcasthe.net/snatchlist.php*&hnr=1
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 添加按钮样式
    GM_addStyle(`
        #copyLinksButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        }
        #copyLinksButton:hover {
            background-color: #45a049;
        }
    `);

    // 创建按钮元素
    const button = document.createElement('button');
    button.id = 'copyLinksButton';
    button.textContent = '复制下载链接';
    document.body.appendChild(button);

    // 添加点击事件
    button.addEventListener('click', () => {
        // 获取所有的 <a> 元素
        const allLinks = document.querySelectorAll('a');

        // 过滤出 href 包含 'action=download' 的链接
        const downloadLinks = Array.from(allLinks)
            .filter(link => link.href.includes('action=download'))
            .map(link => link.href) // 获取每个链接的 href 属性
            .join('\n'); // 用换行符分隔链接

        // 将链接列表复制到剪贴板
        navigator.clipboard.writeText(downloadLinks)
            .then(() => {
                alert('下载链接已复制到剪贴板');
            })
            .catch(err => {
                console.error('复制到剪贴板时出错:', err);
                alert('复制到剪贴板时出错');
            });
    });
})();