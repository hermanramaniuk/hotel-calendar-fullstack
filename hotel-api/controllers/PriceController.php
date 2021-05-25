<?php

namespace app\controllers;
use app\models\Room;
use app\models\Price;
use Yii;

class PriceController extends \yii\web\Controller
{
    public $enableCsrfValidation = false;

    public function actionIndex()
    {
        $request = Yii::$app->request;
        $type = $request->post('type'); //type

        $today = date('Y-m-d');
        $endDate = date('Y-m-d', mktime(date("H"), date("i"), date("s"), date("n") + 1, date("j"), date("Y")));
        
        $rooms = Room::find()
            ->where(['room.type' => $type])
            ->all();

        $resp = array();
        foreach ($rooms as $room) {
            array_push($resp, Price::find()
                ->select('price.room_id, price.date, price.price, price.status')
                ->where(['price.room_id' => $room->id])
                ->andWhere(['>=', 'price.date', $today])
                ->andWhere(['<', 'price.date', $endDate])
                ->all());
        }
 
        return $this->asJson($resp);
    }

    public function actionUpdate()
    {
        $request = Yii::$app->request;
        $id = $request->post('id'); //room id
        $date = $request->post('date');
        $price = $request->post('price');
        $status = $request->post('status');

        $item = Price::findOne(['room_id' => $id, 'date' => $date]);
        $item->price = $price;
        $item->status = $status;
        $item->update(false);
 
        return $this->asJson($item);
    }
}
