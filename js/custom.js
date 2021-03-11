$(document).ready(function () {

    var teamNumber = 0;
    var teamNumberTemp = 1;
    var html = "";
    var htmlTable = "";
    var teamList = [];
    var listInputId = [];

    $(".div-teamnumber").show();
    $(".div-teamname").hide();
    $("#alr-teamname").hide();
    $("#div-teamweek").hide();
    $("#btn-showranking").hide();
    $("#error1").hide();

    $("#btn-teamnumber").click(function () {
        teamNumber = $("#in-teamnumber").val();
        if (teamNumber % 2 == 0 && teamNumber != 0) {
            $(".div-teamnumber").hide();
            $(".div-teamname").show();
            $("#error1").hide();

            alert("ok");
            $("#lb-teamname").text("Team Name " + 1);
        } else {
            $("#error1").show();
            // alert("The number of teams must be even.");
        }

    });

    $("#btn-teamname").click(function () {
        $("#error1").hide();
        $("#alr-teamname").show();
        if ($("#in-teamname").val() == '') {
            alert("نام تیم نمی تواند خالی باشد");
        } else {

            $("#lb-teamname").text("Team Name " + (teamNumberTemp + 1));
            teamList.push($("#in-teamname").val());
            $("#p-teamname").text($("#p-teamname").text() + $("#in-teamname").val() + ", ");
            $("#in-teamname").val('');

            if (teamNumberTemp == teamNumber) {
                $("#btn-showranking").show();
                $("#btn-teamname").hide();
                $("#in-teamname").hide();
                $("#lb-teamname").hide();
            }
            teamNumberTemp++;
        }
    });

    $("#btn-showranking").click(function () {
        $(".div-teamname").hide();
        $("#alr-teamname").hide();
        $("#div-teamweek").show();

        var tempTeam = teamList.slice();
        var temp2Team = teamList.slice();

        let week = 1;
        htmlTable = '<div id="div-teamweek" class="flex flex-row flex-wrap flex-grow mt-2">' +
            '<div class="w-full p-3"><div class="bg-white border rounded shadow">' +
            '<div class="border-b p-3"><h5 class="font-bold uppercase text-gray-600">Standings</h5></div>' +
            '<div class="p-5"><table id="myTable"  class="w-full p-5 text-gray-700">' +
            '<thead><tr><th class="text-left text-blue-900">row</th>' +
            '<th class="text-left text-blue-900">Team</th>' +
            '<th class="text-left text-blue-900">W</th>' +
            '<th class="text-left text-blue-900">D</th>' +
            '<th class="text-left text-blue-900">L</th>' +
            '<th class="text-left text-blue-900">GF</th>' +
            '<th class="text-left text-blue-900">GA</th>' +
            '<th class="text-left text-blue-900">GD</th>' +
            '<th class="text-left text-blue-900">Pts</th>' +
            '</tr></thead><tbody><tr>';
        //Come
        week = 1;
        let count = 1;
        let mp = 0;
        html += '<div class="flex flex-wrap w-full"><strong>First Half Season</strong></div>'
        while (count < teamNumber) {
            let j = teamNumber - 1;
            let len = teamNumber / 2;

            html += '<div class="flex flex-wrap w-full"><strong>' + "Week " + week + '</strong></div>'
            for (i = 0; i < len; i++) {
                //team[i] vs team[j]
                html += '<div class="flex flex-wrap">' +
                    '<div class="w-1/2 p-3">' +
                    '<div class="bg-white border rounded shadow p-2">' +
                    '<div class="flex flex-row items-center">' +
                    '<div class="flex-1 text-right md:text-center">' +
                    '<h5 class="font-bold uppercase text-gray-500">' + tempTeam[i] + '</h5>' +
                    '<input class="in-goal rounded p-5 text-balck-500 bg-gray-300" type="text" name="team1" id="in' + '-' + mp + '-' + week + '-' + i + '" placeholder="Game Result">' +
                    '</div></div></div></div>';

                html += '' +
                    '<div class="w-1/2 p-3">' +
                    '<div class="bg-white border rounded shadow p-2">' +
                    '<div class="flex flex-row items-center">' +
                    '<div class="flex-1 text-right md:text-center">' +
                    '<h5 class="font-bold uppercase text-gray-600">' + tempTeam[j] + '</h5>' +
                    '<input class="in-goal rounded p-5 text-balck-500 bg-gray-300" type="text" name="team1" id="in' + '-' + mp + '-' + week + '-' + j + '" placeholder="Game Result">' +
                    '</div></div></div></div></div>';

                listInputId.push("in" + "-" + mp + "-" + week + "-" + i);
                listInputId.push("in" + "-" + mp + "-" + week + "-" + j);

                mp++;
                j--;
            }

            //IN ROTATION
            for (let i = 1; i < teamNumber; i++) {
                tempTeam[i] = temp2Team[i + 1];
            }
            tempTeam[teamNumber - 1] = temp2Team[1];
            temp2Team = tempTeam.slice();
            //
            week++;
            count++;

            //یه کاری کنیم دوباره بره شروع کنه برای نیم فصل دوم
            if (count == teamNumber && week == teamNumber) {
                html += '<hr class="border-b-2 border-gray-400 my-8 mx-4"><div class="flex flex-wrap w-full"><strong>Second Half Season</strong></div>'
                count = 1;
            }
        }


        //Fill Table Body
        for (let i = 0; i < teamNumber; i++) {
            htmlTable += '<tr>';
            htmlTable += '<td id="row-' + i + '">' + (i + 1) + '</td>'
            htmlTable += '<td id="name-' + i + '">' + teamList[i] + '</td>';
            htmlTable += '<td id="w-' + i + '">0</td>';
            htmlTable += '<td id="d-' + i + '">0</td>';
            htmlTable += '<td id="l-' + i + '">0</td>';
            htmlTable += '<td id="gf-' + i + '">0</td>';
            htmlTable += '<td id="ga-' + i + '">0</td>';
            htmlTable += '<td id="gd-' + i + '">0</td>';
            htmlTable += '<td id="pts-' + i + '">0</td>';
            htmlTable += '<tr>';
        }

        htmlTable += '</tbody></table></div></div></div></div>';
        html += htmlTable;

        $("#div-general").append(html);


    });


    $('body').on('change', '.in-goal', function () {
        //$('.in-goal').on('change', 'input', function(event){
        //$(".in-goal").change(function () {
        //--*--*--*--Compare
        // for (let i = 0; i < listInputId.length; i += 2) {

        // var splitInput1 = listInputId[i].split("-");
        // var idTeam1 = splitInput1[3];

        // var splitInput2 = listInputId[i + 1].split("-");
        // var idTeam2 = splitInput2[3];

        var idChanged = $(this).attr("id");

        var mpArr = idChanged.split("-");
        var mpI = mpArr[1];
        var idTeam1 = mpArr[3];

        var idChanged2 = 0;

        for (let z = 0; z < listInputId.length; z++) {
            var temp1 = listInputId[z];
            var temp2 = temp1.split("-");
            if (temp2[1] == mpI && listInputId[z] != idChanged) {
                idChanged2 = listInputId[z];
            }
        }

        var mpArr2 = idChanged2.split("-");
        var idTeam2 = mpArr2[3];

        //---get val from input
        if ($("#" + idChanged).val() != "" && $("#" + idChanged2).val() != "") {

            var inVal1 = 0;
            inVal1 = parseInt($("#" + idChanged).val());

            var inVal2 = 0;
            inVal2 = parseInt($("#" + idChanged2).val());

            if (inVal1 > inVal2) {
                //-----------winner
                var w = parseInt($("#w-" + idTeam1).text());
                $("#w-" + idTeam1).text((w + 1).toString());

                var gf1 = parseInt($("#gf-" + idTeam1).text());
                $("#gf-" + idTeam1).text((gf1 + inVal1).toString());

                var ga1 = parseInt($("#ga-" + idTeam1).text());
                $("#ga-" + idTeam1).text((ga1 + inVal2).toString());

                //var gd1 = parseInt($("#gd-" + idTeam1).text());
                $("#gd-" + idTeam1).text(parseInt($("#gf-" + idTeam1).text()) - parseInt($("#ga-" + idTeam1).text()));


                var pts = parseInt($("#pts-" + idTeam1).text());
                $("#pts-" + idTeam1).text((pts + 3).toString());

                //-----------loser
                var l = parseInt($("#l-" + idTeam2).text());
                $("#l-" + idTeam2).text((l + 1).toString());

                var gf2 = parseInt($("#gf-" + idTeam2).text());
                $("#gf-" + idTeam2).text((gf2 + inVal2).toString());

                var ga2 = parseInt($("#ga-" + idTeam2).text());
                $("#ga-" + idTeam2).text((ga2 + inVal1).toString());

                //var gd2 = parseInt($("#gd-" + idTeam2).text());
                $("#gd-" + idTeam2).text(parseInt($("#gf-" + idTeam2).text()) - parseInt($("#ga-" + idTeam2).text()));

            }

            if (inVal1 < inVal2) {
                //-----------winner
                var w = parseInt($("#w-" + idTeam2).text());
                $("#w-" + idTeam2).text((w + 1).toString());

                var gf2 = parseInt($("#gf-" + idTeam2).text());
                $("#gf-" + idTeam2).text((gf2 + inVal2).toString());

                //var gd2 = parseInt($("#gd-" + idTeam2).text());
                //$("#gd-" + idTeam2).text((gd2 + inVal2).toString());

                var ga2 = parseInt($("#ga-" + idTeam2).text());
                $("#ga-" + idTeam2).text((ga2 + inVal1).toString());

                var pts = parseInt($("#pts-" + idTeam2).text());
                $("#pts-" + idTeam2).text((pts + 3).toString());

                $("#gd-" + idTeam2).text(parseInt($("#gf-" + idTeam2).text()) - parseInt($("#ga-" + idTeam2).text()));

                //-----------loser
                var l = parseInt($("#l-" + idTeam1).text());
                $("#l-" + idTeam1).text((l + 1).toString());

                var gf1 = parseInt($("#gf-" + idTeam1).text());
                $("#gf-" + idTeam1).text((gf1 + inVal1).toString());

                var ga1 = parseInt($("#ga-" + idTeam1).text());
                $("#ga-" + idTeam1).text((ga1 + inVal2).toString());

                //var gd1 = parseInt($("#gd-" + idTeam1).text());
                $("#gd-" + idTeam1).text(parseInt($("#gf-" + idTeam1).text()) - parseInt($("#ga-" + idTeam1).text()));

            }

            if (inVal1 == inVal2) {

                var gf1 = parseInt($("#gf-" + idTeam1).text());
                $("#gf-" + idTeam1).text((gf1 + inVal1).toString());

                var gf2 = parseInt($("#gf-" + idTeam2).text());
                $("#gf-" + idTeam2).text((gf2 + inVal2).toString());

                // var gd1 = parseInt($("#gd-" + idTeam1).text());
                // $("#gd-" + idTeam1).text((gd1 + inVal1).toString());

                //var gd2 = parseInt($("#gd-" + idTeam2).text());
                //$("#gd-" + idTeam2).text((gd2 + inVal2).toString());

                var pts1 = parseInt($("#pts-" + idTeam1).text());
                $("#pts-" + idTeam1).text((pts1 + 1).toString());

                var pts2 = parseInt($("#pts-" + idTeam2).text());
                $("#pts-" + idTeam2).text((pts2 + 1).toString());

                $("#gd-" + idTeam1).text(parseInt($("#gf-" + idTeam1).text()) - parseInt($("#ga-" + idTeam1).text()));
                $("#gd-" + idTeam2).text(parseInt($("#gf-" + idTeam2).text()) - parseInt($("#ga-" + idTeam2).text()));

            }

            //Sort Table
            sortTable();
        }
        // }
    });


});

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 2); i+=2) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("td")[8];
            y = rows[i + 2].getElementsByTagName("td")[8];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
            switching = true;
        }
    }
}

// function Sort() {
//     var table = $('table');
//
//     $('#th-pts')
//         .wrapInner('<span title="Sort"/>')
//         .each(function () {
//
//             var th = $(this),
//                 thIndex = th.index(),
//                 inverse = false;
//
//             th.click(function () {
//
//                 table.find('td').filter(function () {
//
//                     return $(this).index() === thIndex;
//
//                 }).sortElements(function (a, b) {
//
//                     return $.text([a]) > $.text([b]) ?
//                         inverse ? -1 : 1 :
//                         inverse ? 1 : -1;
//
//                 }, function () {
//
//                     // parentNode is the element we want to move
//                     return this.parentNode;
//
//                 });
//
//                 inverse = !inverse;
//
//             });
//
//         });
//
// }