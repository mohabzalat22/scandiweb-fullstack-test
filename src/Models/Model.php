<?php

namespace App\Model;

abstract class Model
{
    public function __construct(protected $table, private $orm)
    {
        $this->table = $table;
    }

    public function create(array $data)
    {
        $record = $this->orm::dispense($this->table);
        foreach ($data as $key => $value) {
            $record->$key = $value;
        }
        return $this->orm::store($record);
    }

    public function find($id)
    {
        return $this->orm::load($this->table, $id);
    }

    public function all()
    {
        return $this->orm::findAll($this->table);
    }

    public function update($id, array $data)
    {
        $record = $this->orm::load($this->table, $id);
        if ($record->id) {
            foreach ($data as $key => $value) {
                $record->$key = $value;
            }
            return $this->orm::store($record);
        }
        return false;
    }

    public function delete($id)
    {
        $record = $this->orm::load($this->table, $id);
        if ($record->id) {
            $this->orm::trash($record);
            return true;
        }
        return false;
    }
}
