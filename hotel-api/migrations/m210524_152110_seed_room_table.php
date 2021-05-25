<?php

use yii\db\Migration;

/**
 * Class m210524_152110_seed_room_table
 */
class m210524_152110_seed_room_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->insertFakeRooms();
    }

    /**
     * {@inheritdoc}
     */
    private function insertFakeRooms()
    {
        $faker = \Faker\Factory::create();

        for($i = 0; $i < 2; $i++) {
            for($j = 0; $j < 5; $j++) {
                $this->insert(
                    'room',
                    [
                        'type' => $i,
                        'name' => $faker->name
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
        echo "m210524_152110_seed_room_table cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m210524_152110_seed_room_table cannot be reverted.\n";

        return false;
    }
    */
}
