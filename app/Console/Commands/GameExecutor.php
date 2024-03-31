<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\RemainingTimeChanged;
use App\Events\WinnerNumberGenerated;

class GameExecutor extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    //protected $signature = 'app:game-executor';
    protected $signature = 'game:execute';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Starts executing the game';

    private $time = 15;

    // Constructor

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        while(true) {
            Broadcast(new RemainingTimeChanged($this->time . 's'));
            
            $this->time--;
            sleep(1);
            
            if($this->time === 0){
                $this->time = 'Waiting to start';
                // Valor del nuevo tiempo
                Broadcast(new RemainingTimeChanged($this->time));
                // Numero generado - Ganador
                Broadcast(new WinnerNumberGenerated(mt_rand(1,12)));
                
                sleep(5);
                $this->time = 15;

            }
        }
    }
}
