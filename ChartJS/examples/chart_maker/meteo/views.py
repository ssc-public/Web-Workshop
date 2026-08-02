from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
import requests
from django.template import loader

from json import dumps


import jdatetime

def browserHeaders():
    return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Referer': 'https://www.google.com/',
    }

def makeRequest(url, headers = browserHeaders(), resDataType = 'json'):
    res = requests.get(url, headers=headers)
    if resDataType == 'json':
        res = res.json()
    else:
        res = res.text
    return res

def findInsCode(name):
    url = 'http://cdn.tsetmc.com/api/Instrument/GetInstrumentSearch/' + name
    res = makeRequest(url)
    if res['instrumentSearch'] != None and res['instrumentSearch'][0] != None and res['instrumentSearch'][0]['insCode'] != None:
         insCode = res['instrumentSearch'][0]['insCode']
    return insCode

# print(findInsCode("شتران"))
def lastdaye(name):
    url = 'http://cdn.tsetmc.com/api/ClientType/GetClientType/'+ findInsCode(name) +'/1/0'
    res = makeRequest(url)
    data = []
    if res['clientType'] != None:
        data = res['clientType']
    return data
def lastdate(name):
    url = 'http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/'+ findInsCode(name)
    res = makeRequest(url)
    if res['closingPriceInfo'] != None:
        data = res['closingPriceInfo']['finalLastDate']
    return data
def pric(name):
    url = 'http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/'+ findInsCode(name)
    res = makeRequest(url)
    if res['closingPriceInfo'] != None:
        data = res['closingPriceInfo']['pClosing']
    return data


def get_data(name):
    url = 'http://cdn.tsetmc.com/api/ClientType/GetClientTypeHistory/'+ findInsCode(name)
    res = makeRequest(url)
    data = []
    if res['clientType'] != None:
        data = res['clientType']
    return data




def get_data_panda(days, namad):
    days = int(days)
    hajm = []
    ghodrat = []
    tarikh = []
    god = []
    haghighi = []
    sarane_khar = []

    data = lastdate(namad)
    pr = pric(namad)
    sal = data
    roz = int(sal % 100)
    sal = sal / 100
    mah = int(sal % 100)
    sal = int(sal / 100)
    tarikh_yeki = jdatetime.date.fromgregorian(day=roz, month=mah, year=sal)
    tarikh.append(tarikh_yeki)
    data = lastdaye(namad)
    hajm_yeki = int(data["buy_I_Volume"] + data["buy_N_Volume"])*pr // 10000000000
    haghigh_yeki = int(data["buy_I_Volume"] - data["sell_I_Volume"])*pr // 10000000000
    ghodrat_yeki = int(data["sell_I_Volume"] + data["sell_N_Volume"])*pr // 10000000000

    if ( int(data["buy_CountI"])) > 0:
        sarane = (int(data["buy_I_Volume"])*pr / int(data["buy_CountI"])) / 10000000
    else:
        sarane = 0
    if (int(data["sell_I_Volume"]) + int(data["sell_N_Volume"])) > 0:
        ghodrat_ = (int(data["buy_I_Volume"]) + int(data["buy_N_Volume"])) / (int(data["sell_I_Volume"]) + int(data["sell_N_Volume"]))
    else:
        ghodrat_ = 0


    sarane_khar.append(sarane)
    hajm.append(hajm_yeki)
    ghodrat.append(ghodrat_yeki)
    god.append(ghodrat_)
    haghighi.append(haghigh_yeki)

    data = get_data(namad)

    for i in range(days-1):
        cn = int(i)
        sal = data[cn]["recDate"]
        roz = int(sal%100)
        sal= sal/100
        mah = int(sal%100)
        sal = int(sal / 100)
        tarikh_yeki = jdatetime.date.fromgregorian(day=roz, month=mah, year=sal)
        if(tarikh[0] == tarikh_yeki):
            hajm.pop()
            ghodrat.pop()
            tarikh.pop()
            god.pop()
            sarane_khar.pop()
            haghighi.pop()

        hajm_yeki = int(data[cn]["buy_I_Value"] + data[cn]["buy_N_Value"])//10000000000

        ghodrat_yeki = int(data[cn]["sell_I_Value"] + data[cn]["sell_N_Value"])//10000000000
        haghigh_yeki =  int(data[cn]["buy_I_Value"] - data[cn]["sell_I_Value"] )//10000000000
        ghodrat_ = 0 if  (int(data[cn]["sell_I_Value"])*int(data[cn]["buy_I_Count"])) == 0 else (int(data[cn]["buy_I_Value"])*int(data[cn]["sell_I_Count"]))/(int(data[cn]["sell_I_Value"])*int(data[cn]["buy_I_Count"]))
        if (int(data[cn]["buy_I_Count"])) > 0 :
            sarane = (int(data[cn]["buy_I_Value"])/int(data[cn]["buy_I_Count"]))/(10000000)
        else:
            sarane = 0
        hajm.append(hajm_yeki)
        ghodrat.append(ghodrat_yeki)
        tarikh.append(tarikh_yeki)
        god.append(ghodrat_)
        sarane_khar.append(sarane)
        haghighi.append(haghigh_yeki)

    tar = []
    for i in tarikh:
        num = str(i)
        days = num[0] + num[1] + num[2] + num[3] + "/" + num[5] + num[6] + "/" + num[8] + num[9]
        tar.append(days)

    res = tar[::-1]
    tarikh = res
    res = haghighi[::-1]
    haghi = res
    res = ghodrat[::-1]
    ghodrat = res
    res = hajm[::-1]
    hajm = res
    res = god[::-1]
    god = res
    res = sarane_khar[::-1]
    sarane_khar = res

    dataDictionary = {
        "namad": '',
        "haghighi": [],
        "tarikh": [],
        "kharid_haghighi": [],
        "ghodrat": [],
        "hajm": [],
        "sar": [],
    }
    dataDictionary['namad'] = namad
    dataDictionary['haghighi'] = haghi
    dataDictionary['tarikh'] = tarikh
    dataDictionary['kharid_haghighi'] = ghodrat
    dataDictionary['ghodrat'] = god
    dataDictionary['hajm'] = hajm
    dataDictionary['sar'] = sarane_khar
    return dataDictionary

def main_form(request):
    if request.method == 'POST':
        one = request.POST.get('one')
        two = request.POST.get('two')
        if one == "one":
            namad = request.POST.get('namad')
            days = request.POST.get('days')
            dataDic = get_data_panda(days, namad)
            dataJSON = dumps(dataDic)
            temolate = loader.get_template('index.html')
            context = {'data': dataJSON}
            return HttpResponse(temolate.render(context, request))
        if two == "two":
            namad = request.POST.get('namad')
            days = request.POST.get('days')
            dataDic = get_data_panda(days, namad)
            dataJSON = dumps(dataDic)
            temolate = loader.get_template('index2.html')
            context = {'data': dataJSON}
            return HttpResponse(temolate.render(context, request))
    return render(request, 'form.html')

def adad(request , namad , days):
    dataDic = get_data_panda(namad , days)
    dataJSON = dumps(dataDic)
    temolate = loader.get_template('index.html')
    context = {'data': dataJSON}
    return HttpResponse(temolate.render(context, request))





