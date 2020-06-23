/////player1
var poker1_g = []
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
            let r = $poker.attr('data-poker')
            r = Number(r)
            $poker.attr('src', './poker/pic' + (r + 1) + '.png')
            $poker.attr('data-back', false)
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

$(() => {
    $('#main1').on('click', () => {

        // 洗空桌面
        $('#data1').empty();

        // 產生新撲克牌
        var poker = []
        for (let i = 0; i < 52; i++) {
            poker.push(i)
        }

        // 洗牌
        for (let i = 0; i < 100; i++) {
            // 隨機抽第 r 張，和第一張交換
            let r = RandomInt(0, 51)
            let temp = poker[r]
            poker[r] = poker[0]
            poker[0] = temp
        }

        var poker1 = []
        for (let i = 0; i < 5; i++) {
            poker1[i] = poker[i]
        }
        // 發牌
        for (let i = 0; i < 5; i++) {
            newPoker(poker[i], i)
        }

        poker1_g = poker1
        return poker1_g
    })
})


//開牌
$(() => {
    $('#open1').on('click', () => {

        for (let i = 0; i < 5; i++) {
            //var temp = '#' + i
            // 產生 div 的 jQuery 物件在變數 $div
            var temp = $('#' + i).attr("data-poker")
            $('#' + i).attr('src', './poker/pic' + (poker1_g[i] + 1) + '.png')
            //$('#' + i).attr('src', './poker/pic' + temp + '.png')
            $('#' + i).attr('data-back', false)
        }
    })
})

//蓋牌
$(() => {
    $('#close1').on('click', () => {
        // 洗空桌面
        //$('#data1').empty();

        for (let i = 0; i < 5; i++) {
            //var temp = '#' + i
            // 產生 div 的 jQuery 物件在變數 $div
            $('#' + i).attr('src', './poker/back.png')
            $('#' + i).attr('data-back', true)
            //$('#' + i).attr('src', './poker/pic' + $('#' + i).attr("data-poker") + '.png')
            $div = $('<div>').addClass('col').addClass('poker')
            // 將 $img 插入到 $div 內
            //$div.append($('#' + i))
            // 將 $div 插入到網頁 id=data 的html element 裡面
            //$('#data1').append($div)
        }
    })
})

/////player2

var poker2_g = []

// 產生撲克牌在網頁上
var newPoker2 = (r, i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    let $img = $('<img>').attr('src', './poker/back.png')
    $img.attr('data-poker', r)
    $img.attr('data-back', true)
    $img.attr('id', i + '')

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $poker2 = $(event.target)


        // 判斷目前牌是蓋著還是翻開
        if ($poker2.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            let r = $poker2.attr('data-poker')
            r = Number(r)
            $poker2.attr('src', './poker/pic' + (r + 1) + '.png')
            $poker2.attr('data-back', false)
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

$(() => {
    $('#main2').on('click', () => {

        // 洗空桌面
        $('#data2').empty();

        // 產生新撲克牌
        var poker2 = []
        for (let i = 0; i < 52; i++) {
            poker2.push(i)
        }

        // 洗牌
        for (let i = 0; i < 100; i++) {
            // 隨機抽第 r 張，和第一張交換
            let r = RandomInt(0, 51)
            let temp = poker2[r]
            poker2[r] = poker2[0]
            poker2[0] = temp
        }

        var poker2_2 = []
        for (let i = 0; i < 5; i++) {
            poker2_2[i] = poker2[i]
        }
        // 發牌
        for (let i = 0; i < 5; i++) {
            newPoker2(poker2[i], i + 5)
        }
        poker2_g = poker2_2
        return poker2_g
    })
})

//開牌
$(() => {
    $('#open2').on('click', () => {
        for (let i = 5; i < 10; i++) {
            //var temp = '#' + i
            // 產生 div 的 jQuery 物件在變數 $div
            var temp = $('#' + i).attr("data-poker")
            $('#' + i).attr('src', './poker/pic' + (poker2_g[i - 5] + 1) + '.png')
            //$('#' + i).attr('src', './poker/pic' + temp + '.png')
            $('#' + i).attr('data-back', false)
        }
    })
})

//蓋牌
$(() => {
    $('#close2').on('click', () => {
        // 洗空桌面
        //$('#data1').empty();

        for (let i = 5; i < 10; i++) {
            //var temp = '#' + i
            // 產生 div 的 jQuery 物件在變數 $div
            $('#' + i).attr('src', './poker/back.png')
            $('#' + i).attr('data-back', true)
            $div = $('<div>').addClass('col').addClass('poker')
        }
    })
})


////////////
/*
//出牌
$(() => {
    $('#11').on('click', () => {
        let temp = $('#11').attr('id') - 11
        let $img = $('<img>').attr('src', './poker/back.png')

        $img.attr('src', './poker/pic' + temp + '.png')

        $div = $('<div>').addClass('col').addClass('poker')

        // 將 $img 插入到 $div 內
        $div.append($img)

        // 將 $div 插入到網頁 id=data 的html element 裡面
        $('#table').append($img)
    })
})
*/