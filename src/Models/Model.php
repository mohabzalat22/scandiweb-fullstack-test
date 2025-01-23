<?php

namespace App\Models;

abstract class Model
{
    private $orm;
    public function __construct(protected string $table)
    {
        $this->table = $table;
        $database = \App\App::init()->getService('database');
        $this->orm = $database->orm();
    }

    public function create(array $data)
    {
        $result = $this->orm->insert($this->table, $data);
        $id = $this->orm->id();
        return $result->rowCount() ?  $this->find($id) : NULL;
    }

    public function find($id)
    {
        return $this->orm->get($this->table, "*", ['id' => $id]);
    }

    public function all()
    {
        return $this->orm->select($this->table, "*");
    }

    public function update($id, array $data)
    {
        if (isset($data['id'])) {
            unset($data['id']); // unset id 
        }

        $result = $this->orm->update($this->table, $data, ['id' => $id]);
        return $result->rowCount() ?  $this->find($id) : NULL;
    }

    public function delete($id)
    {
        $result = $this->orm->delete($this->table, ['id' => $id]);
        return $result->rowCount() ?  TRUE : FALSE;
    }
}
