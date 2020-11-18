<?php

if (!function_exists('get_user_timezone')) {
    function get_user_timezone()
    {
        return 'UTC';
    }
}

if (!function_exists('get_request_ip')) {
    function get_request_ip()
    {
        if (isset($_SERVER['X_FORWARDED_FOR'])) {
            return $_SERVER['X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['CLIENT_IP'])) {
            return $_SERVER['CLIENT_IP'];
        }

        return $_SERVER['REMOTE_ADDR'];
    }
}


if (!function_exists('to_name_value')) {
    function to_name_value($array, $keys = null)
    {
        $data = [];
        foreach ($array as $name => $value) {
            $row = ['name' => $name, 'value' => $value];
            if (isset($keys)) $row = array_merge($row, $keys);
            array_push($data, $row);
        }

        return $data;
    }
}

if (!function_exists('sorting_by_key')) {
    /**
     * Sorting callable helper
     *
     * @param string $key
     * @param string $order
     *
     * @return Closure
     */
    function sorting_by_key($key, $order = 'ASC')
    {
        return function ($a, $b) use ($key, $order) {
            if ($a[$key] === $b[$key]) {
                return 0;
            }

            $value = $a[$key] < $b[$key] ? -1 : 1;
            if ($order === 'DESC') {
                $value *= -1;
            }

            return $value;
        };
    }
}

if (!function_exists('get_columns_flat_at')) {
    /**
     * Get all the columns name in the given level
     *
     * @param array $columns
     * @param int $level
     *
     * @return array
     */
    function get_columns_flat_at(array $columns, $level = 0)
    {
        $names = [];

        foreach ($columns as $column) {
            $parts = explode('.', $column);

            if (isset($parts[$level])) {
                $names[] = $parts[$level];
            }
        }

        return $names;
    }
}

if (!function_exists('get_csv_flat_columns')) {
    /**
     * Gets a CSV flat columns list from the given array
     *
     * @param array $columns
     * @param null $prefix
     *
     * @return string
     */
    function get_csv_flat_columns(array $columns, $prefix = null)
    {
        $flatColumns = [];
        $prefix = $prefix === null ? '' : $prefix . '.';

        foreach ($columns as $key => $value) {
            if (is_array($value)) {
                $value = get_csv_flat_columns($value, $prefix . $key);
            } else {
                $value = $prefix . $key;
            }

            $flatColumns[] = $value;
        }

        return implode(',', $flatColumns);
    }
}

if (!function_exists('get_array_flat_columns')) {
    /**
     * Gets an array flat columns list from the given array
     *
     * @param $columns
     *
     * @return array
     */
    function get_array_flat_columns($columns)
    {
        // TODO: make sure array is passed???
        return explode(',', get_csv_flat_columns($columns ?: []));
    }
}
if (!function_exists('get_unflat_columns')) {
    /**
     * Gets the unflat version of flat (dot-notated) column list
     *
     * @param string|array $columns
     *
     * @return array
     */
    function get_unflat_columns($columns)
    {
        $names = [];

        if (!is_array($columns)) {
            $columns = explode(',', $columns);
        }

        foreach ($columns as $column) {
            $parts = explode('.', $column, 2);

            if (isset($parts[0])) {
                if (!isset($names[$parts[0]])) {
                    $names[$parts[0]] = null;
                }

                if (isset($parts[1])) {
                    if ($names[$parts[0]] === null) {
                        $names[$parts[0]] = [];
                    }

                    $child = get_unflat_columns($parts[1]);
                    $names[$parts[0]][key($child)] = current($child);
                };
            }
        }

        return $names;
    }
}
