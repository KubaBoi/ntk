
class repair_data:
    """
    Class fills missing minutes
    
    minutes are filled at the end of minute array
    and are the same as last value
    """

    @staticmethod
    def repair(data: dict, date: list) -> dict:
        """Repairs data"""
        for key in data.keys():
            val = data[key]
            if (isinstance(val, list)):
                if (date[3] == key):
                    continue

                if (len(val) == 0):
                    last_value = 0
                else:
                    last_value = val[-1]
                for i in range(len(val), 6):
                    val.append(last_value)
                data[key] = val[:6]
            else:
                data[key] = repair_data.repair(val)
        return data
