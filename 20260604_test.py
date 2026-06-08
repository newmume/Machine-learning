"""
BMI = 體重(kg) / (身高*身高)
讓用戶輸入體重&身高，計算BMI值，至小數第二位
格式：
BMI = ###.# / (#.## x #.##) = ####.##
"""
"""
# 方法一#
weight = float(input("請輸入體重(kg)："))
height = (float(input("請輸入身高(cm)："))/100)
sex = str(input("請輸入性別(M:男/F:女)："))
BMI = weight / (height*height)
level = "0"
if sex == "M":
    if BMI <22:
        level = "過輕"
    elif BMI > 28:
        level = "偏重"
    else:
        level = "適中"
elif sex =="F":
    if BMI <18:
        level = "過輕"
    elif BMI > 25:
        level = "偏重"
    else:
        level = "適中" 
else:
    level = "NA"

print(f"BMI = {weight:4.1f} / ({height:3.2f} x {height:3.2f}) = {BMI:4.2f} {level}" )

"""

"""
承上題，男性標準：22~28，女性標準：18~25
標出過輕、適中、偏重
格式：
BMI = 

"""

"""
#方法二#
weight = float(input("請輸入體重(kg)："))
height = (float(input("請輸入身高(cm)："))/100)
sex = str(input("請輸入性別(M:男/F:女)："))
BMI = weight / (height*height)
level = "0"
if sex == "M":
    BMI_min = 22
    BMI_max = 28
elif sex == "F":
    BMI_min = 18
    BMI_max = 25
else:
    level = "NA"

if BMI <BMI_min:
    level = "過輕"
elif BMI > BMI_max:
    level = "偏重"
else:
    level = "適中"


print(f"BMI = {weight:4.1f} / ({height:3.2f} x {height:3.2f}) = {BMI:4.2f} {level}" )

"""


"""
某停車場前15分鐘免費，第一個小時40元
之後每30分鐘20元，當日最高不超過180元
請輸入停車分鐘數，計算應收費金額
格式：
停車間  計算金額  應付金額
-------- -------- --------
12345678 12345678 12345678
"""
"""
time = int(input("請輸入停車時間(mins)："))
money = pay = 0
if time < 15:
    money = 0
else:
    pay  = (time //30)*20 + time % 30 *20
    if pay <40:
        money = 40
    elif pay >180:
        money = 180
    else:
        money = pay
#print(money,"元")
print("停車間  計算金額  應付金額")
print("-------- -------- --------")
print(f"{time:8d}分,{pay:8d}元,{money:8d}元")

###  HW:如果為殘障車，前4小時免費###


"""

"""
#Level = [0,120,330,500,700,1000]
#Summer = [1.63,2.38,3.52,4.80,5.66,6.41]
#Nsummer = [1.63,2.10,2.89,3.94,4.60,5.03]
tot_vol = int(input"請輸入用電度數：")
is_sum = input("是否為夏季電費(Y/N):")

if tot_vol <=120:
    V_120=tot_vol
else:
    V_120=120
if tot_vol <= 330:
    V_330 = tot_vol - 120
        
"""

"""
電費計算
    用電分級       夏季       非夏季
--------------- ----------  ----------
0   ~ 120度      1.63元/度   1.63元/度
121 ~ 330度部份  2.38元/度   2.10元/度
331 ~ 500度部份  3.52元/度   2.89元/度
501 ~ 700度部份  4.80元/度   3.94元/度
701 ~1000度部份  5.66元/度   4.60元/度
1001度以上部份   6.41元/度   5.03元/度

格式:
區間        度數  單價 金額
----------- ---- ---- ----------
1234 ~ 1234 1234 1.23 12345678.9
"""
tot_val = int(input("請輸入總用電度數: "))
is_summ = input("是否為夏季電費(Y/N): ")
# --- 分配 0~120 應計價度數
if   tot_val <= 120:
    v_120 = tot_val
else:
    v_120 = 120
# --- 分配 121~330 應計價度數
tot_val = tot_val - v_120
if tot_val <= (330-120):
    v_330 = tot_val
else:
    v_330 = (330 - 120)
# --- 分配 331~500 應計價度數
tot_val = tot_val - v_330
if tot_val <= (500-330):
    v_500 = tot_val
else:
    v_500 = (500 - 330)
# --- 分配 501~700 應計價度數
tot_val = tot_val - v_500
if tot_val <= (700-500):
    v_700 = tot_val
else:
    v_700 = (700 - 500)
# --- 分配 701~1000 應計價度數
tot_val = tot_val - v_700
if tot_val <= (1000-700):
    v_1000 = tot_val
else:
    v_1000 = (1000 - 700)
# --- 分配 1001 以上應計價度數
tot_val = tot_val - v_1000
v_1001 = tot_val
# --- 處裡單價
if is_summ == "Y":
    unp_120  = 1.63
    unp_330  = 2.38
    unp_500  = 3.52
    unp_700  = 4.80
    unp_1000 = 5.66
    unp_1001 = 6.41
else:
    unp_120  = 1.63
    unp_330  = 2.10
    unp_500  = 2.89
    unp_700  = 3.94
    unp_1000 = 4.60
    unp_1001 = 5.03
# ----
tot_amt = v_120  * unp_120  + \
          v_330  * unp_330  + \
          v_500  * unp_500  + \
          v_700  * unp_700  + \
          v_1000 * unp_1000 + \
          v_1001 * unp_1001 
# ---
print("區間        度數  單價 金額")
print("----------- ---- ---- ----------")
print(f"{0   :4d} ~ {120 :4d} {v_120 :4d} {unp_120 :3.2f} {v_120  * unp_120 :9.1f}")
print(f"{121 :4d} ~ {330 :4d} {v_330 :4d} {unp_330 :3.2f} {v_330  * unp_330 :9.1f}")
print(f"{331 :4d} ~ {500 :4d} {v_500 :4d} {unp_500 :3.2f} {v_500  * unp_500 :9.1f}")
print(f"{501 :4d} ~ {700 :4d} {v_700 :4d} {unp_700 :3.2f} {v_700  * unp_700 :9.1f}")
print(f"{701 :4d} ~ {1000:4d} {v_1000:4d} {unp_1000:3.2f} {v_1000 * unp_1000:9.1f}")
print(f"{1001:4d} ~ 以上 {v_1001:4d} {unp_1001:3.2f} {v_1001 * unp_1001:9.1f}")