//更多玩家
//指定玩家

var poker = [] // global variable to save all card
var poker1_g = [] // global variable to save the card of first player
var poker2_g = [] // global variable to save the card of second player
//var poker3_g = []
var addindex = 10 // index for get the next card 
var turnindex = 1;
var cardnumber1 = 5;
var cardnumber2 = 5;
//var cardnumber3 = 5;
var totalCount = 0; // variable for count the sum of current card on table
var start = 0; //0:start; 1:stop

//發牌
$(() => {
    $('#main1').on('click', () => {
        //console.log("發牌")
        // 洗空桌面
        $('#data1').empty();
        $('#data2').empty();
        //$('#data3').empty();

        // 產生新撲克牌
        var poker_all = []
        for (let i = 0; i < 52; i++) {
            poker_all.push(i)
        }

        // 洗牌
        for (let i = 0; i < 100; i++) {
            // 隨機抽第 r 張，和第一張交換
            let r = RandomInt(0, 51)
            let temp = poker_all[r]
            poker_all[r] = poker_all[0]
            poker_all[0] = temp
        }

        poker = poker_all
        // 發牌
        var poker1_1 = []
        for (let i = 0; i < 5; i++) {
            poker1_1[i] = poker_all[i]
        }
        for (let i = 0; i < 5; i++) {
            newPoker(i) //add index
        }
        poker1_g = poker1_1

        // 發牌
        var poker2_2 = []
        for (let i = 0; i < 5; i++) {
            poker2_2[i] = poker_all[i + 5]
        }
        for (let i = 0; i < 5; i++) {
            newPoker2(i) //add index
        }
        poker2_g = poker2_2

        start = 0

        //clear table
        $('#table').empty();

        //clear winner and loser
        $('#result').empty();

        //claer totalcount
        totalCount = 0
        $('#count').empty();
        //console.log("totalCount:" + totalCount)
        $p = $('<p>').addClass('p2').attr('id', 'countoutput').text(totalCount)
        // 產生 div 的 jQuery 物件在變數 $div
        $div = $('<div>').addClass('col')
        // 將 $img 插入到 $div 內
        $div.append($p)
        // 將 $div 插入到網頁 id=data1 的html element 裡面
        $('#count').append($div)
        return totalCount, turnindex

        return poker1_g, poker2_g, poker, start, totalCount
    })
})

/////player1
// 發牌相關程式
// 產生撲克牌在網頁上
var newPoker = (i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    let $img = $('<img>').attr('src', './poker/back.png')
    $img.attr('data-poker', poker1_g[i])
    $img.attr('data-back', true)
    $img.attr('id', i + '')

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $poker = $(event.target)
        // 判斷目前牌是蓋著還是翻
        if ($poker.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            $poker.attr('data-back', false)
            let r = poker1_g[i]
            //let r = $poker.attr('data-poker') // get the number 
            //r = Number(r)
            $poker.attr('src', './poker/pic' + (poker1_g[i] + 1) + '.png')
        } else {
            // 目前牌是打開的，要執行蓋牌的動作
            $poker.attr('src', './poker/back.png')
            $poker.attr('data-back', true)
        }
    })

    // 產生 div 的 jQuery 物件在變數 $div
    $div = $('<div>').addClass('col').addClass('poker').attr('id', 'd1')
    // 將 $img 插入到 $div 內
    $div.append($img)

    // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#data1').append($div)
}

//開牌
$(() => {
    if (start == 0) {
        $('#open1').on('click', () => {

            for (let i = 0; i < cardnumber1; i++) {
                //var temp = '#' + i
                // 產生 div 的 jQuery 物件在變數 $div
                var temp = $('#' + i).attr("data-poker")
                //console.log(temp)
                $('#' + i).attr('src', './poker/pic' + (poker1_g[i] + 1) + '.png')
                $('#' + i).attr('data-back', false)
            }
        })
    }
})

//蓋牌
$(() => {
    $('#close1').on('click', () => {

        for (let i = 0; i < cardnumber1; i++) {
            // 產生 div 的 jQuery 物件在變數 $div
            $('#' + i).attr('src', './poker/back.png')
            $('#' + i).attr('data-back', true)
        }
    })
})

//出牌
$(() => {
    if (start == 0) {
        // editing for change the card in owner hand
        $('#11').on('click', () => {
            if (turnindex == 1) {

                //計算總點數
                count(poker1_g[0], 1)

                // add card to 牌桌
                let $img = $('<img>').attr('src', './poker/back.png')
                $img.attr('src', './poker/pic' + (poker1_g[0] + 1) + '.png')
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($img)
                //totalCount = totalCount + (poker1_g[0] + 1)
                // 將 $div 插入到網頁 id=data 的html element 裡面
                $('#table').append($img)
                turnindex = 2

                // show who is the next
                // empty turn expression
                $('#turndiv').empty();
                let $p1 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
                $('#turndiv').append($p1)

                //加牌
                poker1_g.splice(0, 1, poker[addindex])//(index1, index2, insert item)
                let temp = poker1_g[0]
                temp = Number(temp)
                $('data1.first').attr('data-poker', temp)
                $('#0').attr('data-back', true)
                $('#0').attr('src', './poker/back.png')
                //console.log(temp)
                addindex++;

                //更新poker以利洗牌
                let temp1 = poker[addindex];
                poker[addindex] = poker[0];
                poker[0] = temp1;
                //console.log("save")

                //console.log(addindex)
                //重新洗牌
                if (addindex > 52) {
                    addindex = 10
                    //console.log("addindex > 52")
                    wash()
                }

                return addindex, poker1_g, poker

            }
        })
        $('#12').on('click', () => {
            if (turnindex == 1) {

                //計算總點數
                count(poker1_g[1], 1)

                let $img = $('<img>').attr('src', './poker/back.png')
                $img.attr('src', './poker/pic' + (poker1_g[1] + 1) + '.png')
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($img)
                //totalCount = totalCount + (poker1_g[1] + 1)
                // 將 $div 插入到網頁 id=data 的html element 裡面
                $('#table').append($img)
                turnindex = 2

                //empty turn expression
                $('#turndiv').empty();
                let $p2 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
                $('#turndiv').append($p2)

                //加牌
                poker1_g.splice(1, 1, poker[addindex])//(index1, index2, insert item)
                let temp = poker1_g[1]
                temp = Number(temp)
                $('data1.first').attr('data-poker', temp)
                $('#1').attr('data-back', true)
                $('#1').attr('src', './poker/back.png')
                //console.log(temp)

                //更新poker以利洗牌
                let temp1 = poker[addindex];
                poker[addindex] = poker[1];
                poker[1] = temp1;;

                //重新洗牌
                if (addindex > 52) {
                    addindex = 10
                    wash()
                }
                addindex++;
                return addindex, poker1_g, poker

            }
        })
        $('#13').on('click', () => {
            if (turnindex == 1) {

                //計算總點數
                count(poker1_g[2], 1)

                let $img = $('<img>').attr('src', './poker/back.png')
                $img.attr('src', './poker/pic' + (poker1_g[2] + 1) + '.png')
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($img)
                //totalCount = totalCount + (poker1_g[2] + 1)
                // 將 $div 插入到網頁 id=data 的html element 裡面
                $('#table').append($img)
                turnindex = 2

                //empty turn expression
                $('#turndiv').empty();
                let $p3 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
                $('#turndiv').append($p3)

                //加牌
                poker1_g.splice(2, 1, poker[addindex])//(index1, index2, insert item)
                let temp = poker1_g[2]
                temp = Number(temp)
                $('data1.first').attr('data-poker', temp)
                $('#2').attr('data-back', true)
                $('#2').attr('src', './poker/back.png')
                //console.log(temp)

                //更新poker以利洗牌
                let temp1 = poker[addindex];
                poker[addindex] = poker[2];
                poker[2] = temp1;;

                //重新洗牌
                if (addindex > 52) {
                    addindex = 10
                    wash()
                }
                addindex++;
                return addindex, poker1_g, poker

            }
        })
        $('#14').on('click', () => {
            if (turnindex == 1) {

                //計算總點數
                count(poker1_g[3], 1)

                let $img = $('<img>').attr('src', './poker/back.png')
                $img.attr('src', './poker/pic' + (poker1_g[3] + 1) + '.png')
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($img)
                //totalCount = totalCount + (poker1_g[3] + 1)
                // 將 $div 插入到網頁 id=data 的html element 裡面
                $('#table').append($img)
                turnindex = 2

                //empty turn expression
                $('#turndiv').empty();
                let $p4 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
                $('#turndiv').append($p4)

                //加牌
                poker1_g.splice(3, 1, poker[addindex])//(index1, index2, insert item)
                let temp = poker1_g[3]
                temp = Number(temp)
                $('data1.first').attr('data-poker', temp)
                $('#3').attr('data-back', true)
                $('#3').attr('src', './poker/back.png')
                //console.log(temp)

                //更新poker以利洗牌
                let temp1 = poker[addindex];
                poker[addindex] = poker[3];
                poker[3] = temp1;;

                //重新洗牌
                if (addindex > 52) {
                    addindex = 10
                    wash()
                }
                addindex++;
                return addindex, poker1_g, poker

            }
        })
        $('#15').on('click', () => {
            if (turnindex == 1) {

                //計算總點數
                count(poker1_g[4], 1)

                let $img = $('<img>').attr('src', './poker/back.png')
                $img.attr('src', './poker/pic' + (poker1_g[4] + 1) + '.png')
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($img)
                //totalCount = totalCount + (poker1_g[4] + 1)
                // 將 $div 插入到網頁 id=data 的html element 裡面
                $('#table').append($img)
                turnindex = 2

                //empty turn expression
                $('#turndiv').empty();
                let $p5 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
                $('#turndiv').append($p5)

                //加牌
                poker1_g.splice(4, 1, poker[addindex])//(index1, index2, insert item)
                let temp = poker1_g[4]
                temp = Number(temp)
                $('data1.first').attr('data-poker', temp)
                $('#4').attr('data-back', true)
                $('#4').attr('src', './poker/back.png')
                //console.log(temp)

                //更新poker以利洗牌
                let temp1 = poker[addindex];
                poker[addindex] = poker[4];
                poker[4] = temp1;;

                //重新洗牌
                if (addindex > 52) {
                    addindex = 10
                    wash()
                }
                addindex++;
                return addindex, poker1_g, poker
            }
        })
    }
})

//無牌可出
$(() => {
    if (start == 0) {
        //console.log("player1")
        if (turnindex == 1) {
            $('#lose1').on('click', () => {
                $('#result').empty();
                let $p = $('<p>').addClass('p3').attr('id', 'resultoutput').text("輸家：玩家1")
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($p)
                // 將 $div 插入到網頁 id=data1 的html element 裡面
                $('#result').append($div)
            })
        }
        start = 1
        return start
    }
})
/*
//加牌
$(() => {
    $('#add1').on('click', () => {
        //console.log("加牌")

        let $img = $('<img>').attr('src', './poker/back.png')
        $img.attr('data-poker', poker[addindex])
        $img.attr('data-back', true)
        var i = cardnumber1
        $img.attr('id', i + '')
        //console.log(poker[addindex])

        // 當img被按到的時候
        $img.on('click', (event) => {
            let $poker3 = $(event.target)

            // 判斷目前牌是蓋著還是翻開
            if ($poker3.attr('data-back') == 'true') {
                // 目前牌是蓋著，要執行翻牌動作
                $poker3.attr('data-back', false)
                let r = $poker3.attr('data-poker') // get the number 
                r = Number(r) + 1
                $poker3.attr('src', './poker/pic' + r + '.png')
            } else {
                // 目前牌是打開的，要執行蓋牌的動作
                $poker3.attr('src', './poker/back.png')
                $poker3.attr('data-back', true)
            }
        })

        // 產生 div 的 jQuery 物件在變數 $div
        $div = $('<div>').addClass('col').addClass('poker')
        // 將 $img 插入到 $div 內
        $div.append($img)
        // 將 $div 插入到網頁 id=data1 的html element 裡面
        $('#data1').append($div)

        // add 出牌 button
        let $bottun = $('<button>').attr('type', 'button').addClass('btn').addClass('btn-primary')
        //$bottun.setext("出牌")
        $div = $('<div>').addClass('col-lg').addClass('ecol')
        $('#data11').append($div)

        poker1_g.push(poker[addindex])
        //change and return index
        addindex++;
        cardnumber1++;
        return addindex, cardnumber1, poker1_g
    })
})
*/

/////player2
// 發牌相關程式
// 產生撲克牌在網頁上
//i + 60
var newPoker2 = (i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    let $img = $('<img>').attr('src', './poker/back.png')
    $img.attr('data-poker', poker2_g[i])
    $img.attr('data-back', true)
    $img.attr('id', i + 60 + '')

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $poker2 = $(event.target)

        // 判斷目前牌是蓋著還是翻開
        if ($poker2.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            $poker2.attr('data-back', false)
            let r = poker2_g[i]
            $poker2.attr('src', './poker/pic' + (r + 1) + '.png')
        } else {
            // 目前牌是打開的，要執行蓋牌的動作
            $poker2.attr('src', './poker/back.png')
            $poker2.attr('data-back', true)
        }
    })

    // 產生 div 的 jQuery 物件在變數 $div
    $div = $('<div>').addClass('col').addClass('poker')
    // 將 $img 插入到 $div 內
    $div.append($img)
    // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#data2').append($div)
}

//開牌
$(() => {
    $('#open2').on('click', () => {
        for (let i = 60; i < cardnumber2 + 60; i++) {
            // 產生 div 的 jQuery 物件在變數 $div
            //console.log(i)
            var temp = $('#' + i).attr("data-poker")
            $('#' + i).attr('src', './poker/pic' + (poker2_g[i - 60] + 1) + '.png')
            $('#' + i).attr('data-back', false)
        }
    })
})

//蓋牌
$(() => {
    $('#close2').on('click', () => {
        for (let i = 60; i < cardnumber2 + 60; i++) {
            // 產生 div 的 jQuery 物件在變數 $div
            $('#' + i).attr('src', './poker/back.png')
            $('#' + i).attr('data-back', true)
        }
    })
})

//出牌
$(() => {
    //if (start == 0) {
    console.log("turnindex:" + turnindex)
    $('#16').on('click', () => {
        if (turnindex == 2) {
            console.log("#16")
            //計算總點數
            count(poker2_g[0], 2)

            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[0] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            //totalCount = totalCount + (poker2_g[0] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p6 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p6)

            //加牌
            poker2_g.splice(0, 1, poker[addindex])//(index1, index2, insert item)
            let temp = poker2_g[0]
            temp = Number(temp)

            $('data2.first').attr('data-poker', temp)
            $('#60').attr('data-back', true)
            $('#60').attr('src', './poker/back.png')
            // console.log(temp)

            //更新poker以利洗牌
            let temp1 = poker[addindex];
            poker[addindex] = poker[5];
            poker[5] = temp1;;

            //重新洗牌
            if (addindex > 52) {
                addindex = 10
                wash()
            }
            addindex++;
            return addindex, poker1_g, poker
        }
    })
    $('#17').on('click', () => {
        if (turnindex == 2) {

            //計算總點數
            count(poker2_g[1], 2)

            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[1] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            //totalCount = totalCount + (poker2_g[1] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p7 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p7)

            //加牌
            poker2_g.splice(1, 1, poker[addindex])//(index1, index2, insert item)
            let temp = poker2_g[1]
            temp = Number(temp)
            $('data2.first').attr('data-poker', temp)
            $('#61').attr('data-back', true)
            $('#61').attr('src', './poker/back.png')
            //console.log(temp)

            //更新poker以利洗牌
            let temp1 = poker[addindex];
            poker[addindex] = poker[6];
            poker[6] = temp1;;

            //重新洗牌
            if (addindex > 52) {
                addindex = 10
                wash()
            }
            addindex++;
            return addindex, poker1_g, poker
        }
    })
    $('#18').on('click', () => {
        if (turnindex == 2) {

            //計算總點數
            count(poker2_g[2], 2)

            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[2] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            //totalCount = totalCount + (poker2_g[2] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p8 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p8)

            //加牌
            poker2_g.splice(2, 1, poker[addindex])//(index1, index2, insert item)
            let temp = poker2_g[2]
            temp = Number(temp)
            $('data2.first').attr('data-poker', temp)
            $('#62').attr('data-back', true)
            $('#62').attr('src', './poker/back.png')
            //console.log(temp)

            //更新poker以利洗牌
            let temp1 = poker[addindex];
            poker[addindex] = poker[7];
            poker[7] = temp1;;

            //重新洗牌
            if (addindex > 52) {
                addindex = 10
                wash()
            }
            addindex++;
            return addindex, poker1_g, poker
        }
    })
    $('#19').on('click', () => {
        if (turnindex == 2) {

            //計算總點數
            count(poker2_g[3], 2)

            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[3] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            //totalCount = totalCount + (poker2_g[3] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p9 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p9)

            //加牌
            poker2_g.splice(3, 1, poker[addindex])//(index1, index2, insert item)
            let temp = poker2_g[3]
            temp = Number(temp)
            $('data2.first').attr('data-poker', temp)
            $('#63').attr('data-back', true)
            $('#63').attr('src', './poker/back.png')
            //console.log(temp)

            //更新poker以利洗牌
            let temp1 = poker[addindex];
            poker[addindex] = poker[8];
            poker[8] = temp1;;

            //重新洗牌
            if (addindex > 52) {
                addindex = 10
                wash()
            }
            addindex++;
            return addindex, poker1_g, poker
        }
    })
    $('#20').on('click', () => {
        if (turnindex == 2) {

            //計算總點數
            count(poker2_g[4], 2)

            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[4] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            //totalCount = totalCount + (poker2_g[4] + 1)
            $('#countoutput').empty()
            let $p = $('<p>').attr('id', 'count')
            $p.text(totalCount + '')
            $('countoutput').append($p)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p10 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p10)

            //加牌
            poker2_g.splice(4, 1, poker[addindex])//(index1, index2, insert item)
            let temp = poker2_g[4]
            temp = Number(temp)
            $('data2.first').attr('data-poker', temp)
            $('#64').attr('data-back', true)
            $('#64').attr('src', './poker/back.png')
            //console.log(temp)

            //更新poker以利洗牌
            let temp1 = poker[addindex];
            poker[addindex] = poker[9];
            poker[9] = temp1;;

            //重新洗牌
            if (addindex > 52) {
                addindex = 10
                wash()
            }
            addindex++;
            return addindex, poker1_g, poker
        }
    })
    //}
})

//無牌可出
$(() => {
    if (start == 0) {
        if (turnindex == 2) {
            $('#lose2').on('click', () => {
                $('#result').empty();
                let $p = $('<p>').addClass('p3').attr('id', 'resultoutput').text("輸家：玩家2")
                $div = $('<div>').addClass('col').addClass('poker')
                // 將 $img 插入到 $div 內
                $div.append($p)
                // 將 $div 插入到網頁 id=data1 的html element 裡面
                $('#result').append($div)
            })
        }
        start = 1
        return start
        //}
    }
})

/*
//加牌
$(() => {
    $('#add2').on('click', () => {
        //console.log("加牌")

        let $img = $('<img>').attr('src', './poker/back.png')
        $img.attr('data-poker', poker[addindex])
        $img.attr('data-back', true)
        var i = cardnumber2 + 60
        $img.attr('id', i + '')
        //console.log(poker[addindex])

        // 當img被按到的時候
        $img.on('click', (event) => {
            let $poker3 = $(event.target)

            // 判斷目前牌是蓋著還是翻開
            if ($poker3.attr('data-back') == 'true') {
                // 目前牌是蓋著，要執行翻牌動作
                $poker3.attr('data-back', false)
                let r = $poker3.attr('data-poker') // get the number 
                r = Number(r) + 1
                $poker3.attr('src', './poker/pic' + r + '.png')
            } else {
                // 目前牌是打開的，要執行蓋牌的動作
                $poker3.attr('src', './poker/back.png')
                $poker3.attr('data-back', true)
            }
        })

        // 產生 div 的 jQuery 物件在變數 $div
        $div = $('<div>').addClass('col').addClass('poker')
        // 將 $img 插入到 $div 內
        $div.append($img)
        // 將 $div 插入到網頁 id=data1 的html element 裡面
        $('#data2').append($div)

        
        // add 出牌 button
        // haven't editted
        let $bottun = $('<button>').attr('type', 'button').addClass('btn').addClass('btn-primary')
        //$bottun.setext("出牌")
        $div = $('<div>').addClass('col-lg').addClass('ecol')
        $('#data22').append($div)
        

        poker2_g.push(poker[addindex])
        //change and return index
        addindex++;
        cardnumber2++;
        return addindex, cardnumber2, poker2_g
    })
})
*/

// count totalcount
// total amount count
// magic card : 1,4,5,10,J,Q,K
// i => user index
var count = (r, i) => {
    //console.log("count function activated")
    r = r + 1;
    //console.log("r:" + r)
    let point = r % 13
    point = Number(point)
    if (point == 0) {
        point = 13
    }
    // 1: spades; 2: hearts; 3: square; 4: plum
    let color = Math.floor(r / 13)
    if (point != 13) {
        color++;
    }
    console.log("point:" + point)
    console.log("color:" + color)

    // spade 1
    if (point == 1) {
        if (color == 1) {
            totalCount = 0
        } else {
            totalCount = totalCount + point
        }
        //console.log("spade 1")
        if (totalCount > 99) {
            //show loser
            totalCount = 99
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家2")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
            start = 1
        }
    }
    // four
    else if (point == 4) {
        if (turnindex == 1) {
            turnindex == 2;
        } else {
            turnindex == 1
        }
        //console.log("four")
    }
    // five
    else if (point == 5) {
        if (turnindex == 1) {
            turnindex == 2;
        } else {
            turnindex == 1
        }
        //console.log("five")
    }
    // 10
    else if (point == 10) {
        if (color == 2) {
            //console.log("red")
            totalCount = totalCount - 10;
            if (totalCount < 0) {
                totalCount = 0
            }
        } else if (color == 3) {
            //console.log("red")
            totalCount = totalCount - 10;
            if (totalCount < 0) {
                totalCount = 0
            }
        } else {
            //console.log("black")
            totalCount = totalCount + 10
        }

        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            totalCount = 99
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家2")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
            start = 1
        }

        //console.log("ten")
    }
    // J
    else if (point == 11) {
        //console.log("J")
    }
    // Q
    else if (point == 12) {
        if (color == 2) {
            //console.log("red")
            totalCount = totalCount - 20;
            if (totalCount < 0) {
                totalCount = 0
            }
        } else if (color == 3) {
            //console.log("red")
            totalCount = totalCount - 20;
            if (totalCount < 0) {
                totalCount = 0
            }
        }
        else {
            //console.log("black")
            totalCount = totalCount + 20
        }

        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            totalCount = 99
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家2")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)

            start = 1
        }

        //console.log("Q")
    }
    // K
    else if (point == 13) {
        if (totalCount != 99) {
            totalCount = 99
        }
        //console.log("K")
    }
    else {
        //console.log("add:" + point)
        totalCount = totalCount + point

        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            totalCount = 99
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家2")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
            start = 1
        }

    }
    //console.log("number judge finish")
    // add count to page
    $('#count').empty();
    console.log("totalCount:" + totalCount)
    $p = $('<p>').addClass('p2').attr('id', 'countoutput').text(totalCount)
    // 產生 div 的 jQuery 物件在變數 $div
    $div = $('<div>').addClass('col')
    // 將 $img 插入到 $div 內
    $div.append($p)
    // 將 $div 插入到網頁 id=data1 的html element 裡面
    $('#count').append($div)
    return totalCount, turnindex
}

// 重新洗牌
// called by 出牌
// when addindex > 52
var wash = () => {
    //console.log("wash")
    //if (start == 0) {
    //洗牌
    for (let i = 0; i < 100; i++) {
        // 隨機抽第 r 張，和第一張交換
        //console.log("random")
        let r = RandomInt(0, 51)
        //console.log("r:" + r)
        //console.log("poker[r]:" + poker[r])
        if (r == 0) {
            //console.log("user card")
            continue
        } else if (r == 1) {
            //console.log("user card")
            continue
        } else if (r == 2) {
            //console.log("user card")
            continue
        } else if (r == 3) {
            //console.log("user card")
            continue
        } else if (r == 4) {
            //console.log("user card")
            continue
        } else if (r == 5) {
            //console.log("user card")
            continue
        } else if (r == 6) {
            //console.log("user card")
            continue
        } else if (r == 7) {
            //console.log("user card")
            continue
        } else if (r == 8) {
            //console.log("user card")
            continue
        } else if (r == 9) {
            //console.log("user card")
            continue
        } else {
            //console.log("other card")
            let temp = poker[r]
            poker[r] = poker[10]
            poker[10] = temp
        }
    }
    poker.splice(0, 1, poker[53])
    poker.splice(52, 2,)

    for (let i = 0; i < 5; i++) {
        poker1_g[i] = poker[i]
    }
    for (let i = 5; i < 10; i++) {
        poker2_g[i - 5] = poker[i]
    }
    return poker, poker1_g, poker2_g
}
