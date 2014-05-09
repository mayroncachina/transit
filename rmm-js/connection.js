function checkConnection() {
    
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'DESCONHECIDA';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.CELL]     = 'GPRS';
    states[Connection.NONE]     = 'DESCONECTADO';

    $(".connection").html('Conexão: ' + states[networkState]);

    return states[networkState];

}

function getNumConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 0;
    states[Connection.ETHERNET] = 1;
    states[Connection.CELL_2G]  = 2;
    states[Connection.CELL_3G]  = 3;
    states[Connection.CELL_4G]  = 4;
    states[Connection.CELL]     = 5;
    states[Connection.WIFI]     = 6;
    states[Connection.NONE]     = 0;

    return states[networkState];

}

//https://www.iconfinder.com/icons/99719/d6_wifi_icon#size=128
//https://www.iconfinder.com/icons/99782/d5_wifi_icon#size=128
//https://www.iconfinder.com/icons/99708/d4_wifi_icon#size=128
//https://www.iconfinder.com/icons/100016/b3_wifi_icon#size=128
//https://www.iconfinder.com/icons/100232/d2_wifi_icon#size=128
//https://www.iconfinder.com/icons/99741/c5_wifi_icon#size=128

//https://www.iconfinder.com/icons/172633/wifi_icon#size=128