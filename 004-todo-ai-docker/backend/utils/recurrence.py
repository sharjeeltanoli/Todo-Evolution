from dateutil.rrule import rrulestr
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def validate_rrule(rule: str) -> bool:
    """
    Validates if a string is a valid RFC 5545 recurrence rule.
    Example: FREQ=DAILY;INTERVAL=1
    """
    if not rule:
        return False
    try:
        # rrulestr expects the full RRULE: prefix or just the string
        if not rule.startswith("RRULE:"):
            rrulestr(f"RRULE:{rule}")
        else:
            rrulestr(rule)
        return True
    except Exception as e:
        logger.error(f"Invalid recurrence rule '{rule}': {e}")
        return False

def get_next_occurrence(rule: str, after_date: datetime = None) -> datetime:
    """
    Calculates the next occurrence after a given date.
    """
    if not after_date:
        after_date = datetime.utcnow()
    
    try:
        if not rule.startswith("RRULE:"):
            r = rrulestr(f"RRULE:{rule}")
        else:
            r = rrulestr(rule)
        
        return r.after(after_date)
    except Exception as e:
        logger.error(f"Error calculating next occurrence for '{rule}': {e}")
        return None
