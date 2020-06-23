// 記錄撲克牌
var poker = []

// 產生撲克牌在網頁上
var newPoker = (r) => {
    // 計算撲克牌目前的點數及花色
    let point = Math.floor(r / 4)
    let color = r % 4

    // 產生 img 的 jQuery 物件在變數 $img
    var $img = $('<img>').attr('src', './poker/pic' + (r + 1) + '.png')
    $img.addClass('poker')
    $img.attr('data-poker', r)
    $img.attr('data-point', point)
    $img.attr('data-color', color)
    $img.attr('data-back', false)

    // 當img被按到的時候
    $img.on('click', (event) => {
        let $obj = $(event.target)

        // 判斷目前牌是蓋著還是翻開
        if ($obj.attr('data-back') == 'true') {
            // 目前牌是蓋著，要執行翻牌動作
            let r = $obj.attr('data-poker')
            r = Number(r)
            $obj.attr('src', './poker/pic' + (r + 1) + '.png')
            $obj.attr('data-back', false)
        } else {
            // 目前牌是打開的，要執行蓋牌的動作
            $obj.attr('src', './poker/back.png')
            $obj.attr('data-back', true)
        }
    })

    // 產生 div 的 jQuery 物件在變數 $div
    $div = $('<div>').addClass('col').addClass('poker')

    // 將 $img 插入到 $div 內
    $div.append($img)

    // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#data').append($div)
}

// 發五張撲克牌
var dealFive = () => {
    // 產生新撲克牌

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

    // 同花大順
    poker[0] = 51
    poker[1] = 39
    poker[2] = 43
    poker[3] = 3
    poker[4] = 47


    // 同花
    // poker[0] = 22
    // poker[1] = 38
    // poker[2] = 34
    // poker[3] = 18
    // poker[4] = 50

    // 鐵支
    // poker[0] = 38
    // poker[1] = 36
    // poker[2] = 37
    // poker[3] = 48
    // poker[4] = 39


    // 發牌
    for (let i = 0; i < 5; i++) {
        newPoker(poker[i])
    }
}

// 判斷是否是順子
var checkStraight = (card) => {
    let point = [...card]

    // 大到小的排序
    point.sort((a, b) => {
        return a - b
    });


    var isStraght = true
    for (i = 0; i < card.length - 1; i++) {
        if (point[i] - point[i + 1] != 1) {
            isStraght = false
            break
        }
    }
    return isStraght
}

$(() => {

    // 當確定按鈕按到時
    $('#ante').on('click', () => {
        // 將押金扣除
        let total = +$('#total').val()
        let anteMoney = +$('#anteMoney').val()
        total -= anteMoney
        $('#total').val(total)

        // 將發牌按鈕起動
        $('#main').removeAttr('disabled')

        // 將押金和確定鎖住
        $('#anteMoney').attr('disabled', '')
        $('#ante').attr('disabled', '')

    })

    // 當發牌按鈕按到時
    $('#main').on('click', () => {
        // 洗空桌面
        $('#data').empty();

        // 發五張牌
        dealFive()

        $('#main').attr('disabled', '')
        $('#check').removeAttr('disabled')
        $('#output').removeAttr('disabled')
    })

    // 當判斷牌型按鈕按到時
    $('#check').on('click', () => {
        var color = ['梅花', '方塊', '愛心', '黑桃']
        var point = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

        var poker_color = []
        var poker_point = []
        var $poker_list = $('img.poker')
        for (let i = 0; i < $poker_list.length; i++) {
            let $img = $($poker_list[i]);
            poker_color.push(+$img.attr('data-color'))
            poker_point.push(+$img.attr('data-point'))
        }

        // 統計花色出現的次數
        var count_color = [0, 0, 0, 0]
        for (let i = 0; i < poker_color.length; i++) {
            count_color[poker_color[i]]++;
        }

        // 統計點數出現的次數
        var count_point = []
        for (let i = 0; i < 13; i++) {
            count_point.push(0);
        }
        for (let i = 0; i < poker_point.length; i++) {
            count_point[poker_point[i]]++;
        }

        // 將 count_point 複製一份到 count_point_sort
        var count_point_sort = [...count_point]

        count_point_sort.sort() // 排序，結果會是小到大
        count_point_sort.reverse() // 反轉，結果就會是大到小

        // 判斷是否同花
        var isFlush = false
        var flush_color = 0 // 用來紀錄同花的顏色
        for (let i = 0; i < count_color.length; i++) {
            if (count_color[i] == 5) {
                isFlush = true
                flush_color = i
                break
            }
        }

        // 開始判斷牌型
        var strOutput = ''
        if (isFlush) {
            strOutput = color[flush_color] + '同花'
        } else if (count_point_sort[0] == 4) {
            strOutput = '鐵支'
        } else if (count_point_sort[0] == 3 && count_point_sort[0] == 2) {
            strOutput = '葫蘆'
        } else if (count_point_sort[0] == 3 && count_point_sort[0] == 1) {
            strOutput = '三條'
        } else if (count_point_sort[0] == 2 && count_point_sort[0] == 2) {
            strOutput = '兩對'
        } else if (count_point_sort[0] == 2 && count_point_sort[0] == 1) {
            strOutput = '一對'
        } else if (count_point_sort[0] == 1 &&
            count_point_sort[1] == 1 &&
            count_point_sort[2] == 1 &&
            count_point_sort[3] == 1 &&
            count_point_sort[4] == 1) {

            var isStraght = false
            var isBigStraght = false

            // 先檢查目前的牌是否有順子
            isStraght = checkStraight(poker_point);

            // 若不是順子但牌中有A，那就要再檢查是否是大順
            if (!isStraght && count_point[0] != 0) {
                let card = [...poker_point]

                // 找 A 是在那張牌
                for (let i = 0; i < card.length; i++) {
                    if (card[i] == 0) {

                        // 第i張牌就是 A
                        card[i] = 13
                        break
                    }
                }
                isBigStraght = checkStraight(card);
                console.log(isBigStraght)
            }

            // 判斷剩下來的牌型
            if (isFlush && isBigStraght) {
                strOutput = '同花大順'
            } else if (isFlush && isStraght) {
                strOutput = '同花順'
            } else if (isStraght) {
                strOutput = '順子'
            } else {
                strOutput = '散牌'
            }
        }

        // 將判斷的結果顯示到畫面
        $('#output').val(strOutput)
    })
})