// change the card when push 出牌
// poker1_g.splice(1, 0, 45) (index1,index2,insert item)
// 重新洗牌; check whether addindex > 52
// total amount count
// magic card :add 10, 20; minor 10,20; 4,5,J,Q,K




var poker = [] // global variable to save all card
var poker1_g = [] // global variable to save the card of first player
var poker2_g = [] // global variable to save the card of second player
var addindex = 10 // index for get the next card 
var turnindex = 1;
var cardnumber1 = 5;
var cardnumber2 = 5;
var totalCount = 0; // variable for count the sum of current card on table

//發牌
$(() => {
    $('#main1').on('click', () => {
        //console.log("發牌")
        // 洗空桌面
        $('#data1').empty();
        $('#data2').empty();

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
            newPoker(poker_all[i], i) //add index
        }
        poker1_g = poker1_1

        // 發牌
        var poker2_2 = []
        for (let i = 0; i < 5; i++) {
            poker2_2[i] = poker_all[i + 5]
        }
        for (let i = 0; i < 5; i++) {
            newPoker2(poker_all[i + 5], i) //add index
        }
        poker2_g = poker2_2

        return poker1_g, poker2_g, poker
    })
})

/////player1
// 發牌相關程式
// 產生撲克牌在網頁上
var newPoker = (r, i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    let $img = $('<img>').attr('src', './poker/back.png')
    $img.attr('data-poker', r)
    $img.attr('data-back', true)
    $img.attr('id', i + '')

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $poker = $(event.target)
        // 判斷目前牌是蓋著還是翻
        if ($poker.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            $poker.attr('data-back', false)
            let r = $poker.attr('data-poker') // get the number 
            r = Number(r)
            $poker.attr('src', './poker/pic' + (r + 1) + '.png')
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
    // editing for change the card in owner hand
    $('#11').on('click', () => {
        if (turnindex == 1) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker1_g[0] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker1_g[0] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 2

            //empty turn expression
            $('#turndiv').empty();
            let $p1 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
            $('#turndiv').append($p1)
        }
    })
    $('#12').on('click', () => {
        if (turnindex == 1) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker1_g[1] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker1_g[1] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 2

            //empty turn expression
            $('#turndiv').empty();
            let $p2 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
            $('#turndiv').append($p2)
        }
    })
    $('#13').on('click', () => {
        if (turnindex == 1) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker1_g[2] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker1_g[2] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 2

            //empty turn expression
            $('#turndiv').empty();
            let $p3 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
            $('#turndiv').append($p3)
        }
    })
    $('#14').on('click', () => {
        if (turnindex == 1) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker1_g[3] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker1_g[3] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 2

            //empty turn expression
            $('#turndiv').empty();
            let $p4 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
            $('#turndiv').append($p4)
        }
    })
    $('#15').on('click', () => {
        if (turnindex == 1) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker1_g[4] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker1_g[4] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 2

            //empty turn expression
            $('#turndiv').empty();
            let $p5 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家2")
            $('#turndiv').append($p5)
        }
    })
})

//無牌可出
$(() => {
    $('#lose1').on('click', () => {
        $('#result').empty();
        let $p = $('<p>').addClass('p3').attr('id', 'resultoutput').text("輸家：玩家1")
        $div = $('<div>').addClass('col').addClass('poker')
        // 將 $img 插入到 $div 內
        $div.append($p)
        // 將 $div 插入到網頁 id=data1 的html element 裡面
        $('#result').append($div)
    })
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
var newPoker2 = (r, i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    let $img = $('<img>').attr('src', './poker/back.png')
    $img.attr('data-poker', r)
    $img.attr('data-back', true)
    i = i + 60
    $img.attr('id', i + '')

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $poker2 = $(event.target)

        // 判斷目前牌是蓋著還是翻開
        if ($poker2.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            $poker2.attr('data-back', false)
            let r = $poker2.attr('data-poker') // get the number 
            r = Number(r)
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
            console.log(i)
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
    $('#16').on('click', () => {
        if (turnindex == 2) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[0] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker2_g[0] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p6 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p6)
        }
    })
    $('#17').on('click', () => {
        if (turnindex == 2) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[1] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker2_g[1] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p7 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p7)
        }
    })
    $('#18').on('click', () => {
        if (turnindex == 2) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[2] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker2_g[2] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p8 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p8)
        }
    })
    $('#19').on('click', () => {
        if (turnindex == 2) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[3] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker2_g[3] + 1)
            // 將 $div 插入到網頁 id=data 的html element 裡面
            $('#table').append($img)
            turnindex = 1

            //empty turn expression
            $('#turndiv').empty();
            let $p9 = $('<p>').addClass('p3').attr('id', 'turn').text("玩家1")
            $('#turndiv').append($p9)
        }
    })
    $('#20').on('click', () => {
        if (turnindex == 2) {
            let $img = $('<img>').attr('src', './poker/back.png')
            $img.attr('src', './poker/pic' + (poker2_g[4] + 1) + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($img)
            totalCount = totalCount + (poker2_g[4] + 1)
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
        }
    })
})

//無牌可出
$(() => {
    $('#lose2').on('click', () => {
        $('#result').empty();
        let $p = $('<p>').addClass('p3').attr('id', 'resultoutput').text("輸家：玩家2")
        $div = $('<div>').addClass('col').addClass('poker')
        // 將 $img 插入到 $div 內
        $div.append($p)
        // 將 $div 插入到網頁 id=data1 的html element 裡面
        $('#result').append($div)
    })
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

//重新洗牌
//clear the table in the same time
/*
$(() => {
    $('#16').on('click', () => {

    })
})
*/

// count totalcount
// total amount count
// magic card : 1,4,5,10,J,Q,K
// i => user index
var count = (r, i) => {
    let point = Math.floor(r / 4)
    // 1: spades; 2: hearts; 3: square; 4: plum
    let color = r % 4

    // spade 1
    if (point == 1 && color == 1) {
        totalCount = 0
    }
    // four
    else if (point == 4) {
        if (turnindex == 1) {
            turnindex == 2;
        } else {
            turnindex == 1
        }
    }
    // five
    else if (point == 5) {
        if (turnindex == 1) {
            turnindex == 2;
        } else {
            turnindex == 1
        }
    }
    // 10
    else if (point == 10) {
        if (color == 2 || 3) {
            totalCount = totalCount - 10;
        } else {
            totalCount = totalCount + 10
        }
        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家1")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
        }
    }
    // J
    else if (point == 11) {
    }
    // Q
    else if (point == 12) {
        if (color == 2 || 3) {
            totalCount = totalCount - 20;
        } else {
            totalCount = totalCount + 20
        }
        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家1")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
        }
    }
    // K
    else if (point == 13) {
        if (totalCount != 99) {
            totalCount = 99
        }
    }
    else {
        totalCount = totalCount + point
        //test whether totalCount =< 99
        if (totalCount > 99) {
            //show loser
            $('#result').empty();
            let $p = $('<p>').addClass('p3').attr('id', 'resultoutput')
            if (i == 1) {
                $p.text("輸家：玩家1")
            } else {
                $p.text("輸家：玩家1")
            }
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            $div.append($p)
            // 將 $div 插入到網頁 id=data1 的html element 裡面
            $('#result').append($div)
        }
    }




}

//get new card
//player1
var getPoker1 = () => {
    console.log("Test")
    //first edit poker1_g
    //second call newPoker
    //create a loop with cardnumber1
}

// 重新洗牌
// called by 出牌
var wash = () => {

}
