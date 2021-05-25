<?php

namespace app\controllers;
use app\models\Room;

class RoomController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $rooms = Room::find()->all();

        return $this->asJson($rooms);
    }

}
