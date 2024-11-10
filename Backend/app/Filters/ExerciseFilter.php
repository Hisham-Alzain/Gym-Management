<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ExerciseFilter
{
    protected $safeParms = [
        'name' => ['eq', 'like'],
        'muscle' => ['eq'],
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'LIKE'
    ];

    public function transform(Request $request)
    {
        $eleQuery = [];

        foreach ($this->safeParms as $parm => $operators) {
            $query = $request->query($parm);

            if (!isset($query)) {
                continue;
            }

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    if ($operator === 'like') {
                        $eleQuery[] = [$parm, $this->operatorMap[$operator], '%' . $query[$operator] . '%'];
                    } else {
                        if ($query[$operator] == 'ALL') {
                            continue;
                        }
                        if ($query[$operator] == 'Arms') {
                            $muscles = ['Triceps', 'Biceps'];
                            foreach ($muscles as $muscle) {
                                $eleQuery[] = [$parm, $this->operatorMap[$operator], $muscle];
                            }
                            continue;
                        }
                        $muscles = explode('_', $query[$operator]);
                        foreach ($muscles as $muscle) {
                            $eleQuery[] = [$parm, $this->operatorMap[$operator], $muscle];
                        }
                    }
                }
            }
        }
        return $eleQuery;
    }
}
