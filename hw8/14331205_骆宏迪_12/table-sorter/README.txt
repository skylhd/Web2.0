可以应用的网站：
http://soj.sysu.edu.cn/contests.php
引用的一行代码：
$("thead > tr > th").click(function(){var obj = this;var i = $(this).index();var flag = false;$(obj).siblings(".sele").removeClass("sele");if ($(obj).attr("class") != "sele") {$(obj).attr("class", "sele");} else {flag = true;}var b = new Array();var ms = $(obj).closest("table").children("tbody").html();$(ms).each(function(index, element) {b[index] = $(this).html();});for (var j = 0; j < b.length; j++) {if (b[j] == undefined) {b.splice(j, 1);}}b.sort(function(aa, bb){var ssa = $(aa);var ssb = $(bb);for (var j = 0; j < ssa.length; j++) {if (ssa[j].nodeName != "TD") {ssa.splice(j, 1);}if (ssb[j].nodeName != "TD") {ssb.splice(j, 1);}}if (!isNaN(Number(ssa[i].innerHTML))) {return Number(ssa[i].innerHTML) > Number(ssb[i].innerHTML)?1:-1;} else {return ssa[i].innerHTML > ssb[i].innerHTML?1:-1;}});if (flag&&$(obj).attr("class") == "sele") {b.reverse();$(obj).removeClass("sele");}$(obj).closest("table").children("tbody").children("tr").each(function(index, element) {$(element).html(b[index]);});});

可以应用的网站：
http://soj.sysu.edu.cn/ranklist.php
引用的一行代码：
$("thead > tr > td").click(function(){var obj = this;var i = $(this).index();var flag = false;$(obj).siblings(".sele").removeClass("sele");if ($(obj).attr("class") != "sele") {$(obj).attr("class", "sele");} else {flag = true;}var b = new Array();var ms = $(obj).closest("table").children("tbody").html();$(ms).each(function(index, element) {b[index] = $(this).html();});for (var j = 0; j < b.length; j++) {if (b[j] == undefined) {b.splice(j, 1);}}b.sort(function(aa, bb){var ssa = $(aa);var ssb = $(bb);for (var j = 0; j < ssa.length; j++) {if (ssa[j].nodeName != "TD") {ssa.splice(j, 1);}if (ssb[j].nodeName != "TD") {ssb.splice(j, 1);}}if (!isNaN(Number(ssa[i].innerHTML))) {return Number(ssa[i].innerHTML) > Number(ssb[i].innerHTML)?1:-1;} else {return ssa[i].innerHTML > ssb[i].innerHTML?1:-1;}});if (flag&&$(obj).attr("class") == "sele") {b.reverse();$(obj).removeClass("sele");}$(obj).closest("table").children("tbody").children("tr").each(function(index, element) {$(element).html(b[index]);});});


可以应用的网站：
http://soj.sysu.edu.cn/contests.php
引用的一行代码：
$("thead > tr > td").click(function(){var obj = this;var i = $(this).index();var flag = false;$(obj).siblings(".sele").removeClass("sele");if ($(obj).attr("class") != "sele") {$(obj).attr("class", "sele");} else {flag = true;}var b = new Array();var ms = $(obj).closest("table").children("tbody").html();$(ms).each(function(index, element) {b[index] = $(this).html();});for (var j = 0; j < b.length; j++) {if (b[j] == undefined) {b.splice(j, 1);}}b.sort(function(aa, bb){var ssa = $(aa);var ssb = $(bb);for (var j = 0; j < ssa.length; j++) {if (ssa[j].nodeName != "TD") {ssa.splice(j, 1);}if (ssb[j].nodeName != "TD") {ssb.splice(j, 1);}}if (!isNaN(Number(ssa[i].innerHTML))) {return Number(ssa[i].innerHTML) > Number(ssb[i].innerHTML)?1:-1;} else {return ssa[i].innerHTML > ssb[i].innerHTML?1:-1;}});if (flag&&$(obj).attr("class") == "sele") {b.reverse();$(obj).removeClass("sele");}$(obj).closest("table").children("tbody").children("tr").each(function(index, element) {$(element).html(b[index]);});});


