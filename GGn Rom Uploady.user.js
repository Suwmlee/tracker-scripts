// ==UserScript==
// @name         GGn rom Uploady
// @namespace    https://gazellegames.net/
// @version      0.1
// @description  rom Uploady for GGn
// @author       cat
// @match        https://gazellegames.net/upload.php*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function set_name(str) {
    var torrent_name = str.replace('C:\\fakepath\\','')
    var file_name = torrent_name.replace('.torrent','')
    var rom_name = file_name.replace(".zip","")
    var game_name =rom_name.replace(/\(.+\)/,"")
    return {'file_name': file_name, 'rom_name': rom_name, 'game_name': game_name};
}

function fill_form(response) {
    var name_info = set_name($('#file').val())
    var url = response.response[name_info.rom_name]
    var rld = `[align=center] ${name_info.file_name} matches [url=${url}]No-Intro checksums[/url]
                            Compressed with torrentzip
                            Use a GBA emulator or use on a modified GBA to play.
                            [/align]`
    $('#remaster').prop("checked")
    $('#ripsrc_home').prop("checked")
    $('#remaster_title').prop("checked")
    $('#miscellaneous').val("ROM")
    $('#title').val(name_info.game_name)
    $('#release_title').val(name_info.game_name)
    $('#release_desc').val(rld)
    $('#platform').val("Game Boy Advance")
    $('#anonymous').prop("checked")
}
(function() {
    'use strict';
    if (window.location.href.includes("gazellegames")) {
        $('#categories').after(
            "<tr><td></td><td><a id='romid' /></td></tr>"
        )
        $("#romid").after(
            '<a href="javascript:;" id="fill_rom">GBA</a>');
    }
    $("#fill_rom").click(function() { //After the "appid" input loses focus
        var request = GM.xmlHttpRequest({
            method: "GET",                  //We call the Steam API to get info on the game
            url: "https://objectstorage.ap-tokyo-1.oraclecloud.com/n/nrmpw4xvtvgl/b/bucket-20200224-2012/o/GBA.json",
            responseType: "json",
            onload: fill_form
        });
    });
})();
