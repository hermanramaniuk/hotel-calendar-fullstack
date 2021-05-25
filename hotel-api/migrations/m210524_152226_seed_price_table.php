<?php

use yii\db\Migration;

/**
 * Class m210524_152226_seed_price_table
 */
class m210524_152226_seed_price_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->insertFakePrices();
    }

    /**
     * {@inheritdoc}
     */
    private function insertFakePrices()
    {
        $faker = \Faker\Factory::create();

        $begin = new DateTime('2021-05-20');
        $end = new DateTIme('2021-06-30');
        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($begin, $interval, $end);
        foreach($period as $dt) {
            for($i = 1; $i < 11; $i++) {
                $this->insert(
                    'price',
                    [
                        'room_id' => $i,
                        'date' => $dt->format('Y-m-d'),
                        'price' => rand(100, 500),
                        'status' => rand(0, 1)
                    ]
                );
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m210524_152226_seed_price_table cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m210524_152226_seed_price_table cannot be reverted.\n";

        return false;
    }
    */
}
