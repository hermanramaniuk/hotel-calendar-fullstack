<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%price}}`.
 */
class m210524_151308_create_price_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%price}}', [
            'id' => $this->primaryKey(),
            'room_id' => $this->integer()->notNull(),
            'date' => $this->date()->notNull(),
            'price' => $this->integer()->notNull(),
            'status' => $this->integer()->notNull()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%price}}');
    }
}
